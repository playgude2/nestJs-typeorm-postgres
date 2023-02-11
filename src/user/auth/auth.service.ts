import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { AuthHelper } from './auth.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity';
import { LoginDto, RegisterDto } from '../dtos/auth.dto';
import { UserProfile } from '../entities/user-profile.entity';

@Injectable()
export class AuthService {
  @InjectRepository(Users)
  private readonly usersRepository: Repository<Users>;
  @InjectRepository(UserProfile)
  private readonly userProfileRepository: Repository<UserProfile>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  async register(body: RegisterDto) {
    try {
      const { firstName, lastName, role, email, password }: RegisterDto = body;
      let user: Users = await this.usersRepository.findOne({
        where: { email },
      });

      // const result: ResponseService = new ResponseService();
      if (user) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }
      const userProfile = new UserProfile();
      userProfile.firstName = firstName;
      userProfile.lastName = lastName;
      userProfile.email = email;
      const userProfileData = await this.userProfileRepository.save(
        userProfile,
      );
      console.log('userProfileData:::', userProfileData);
      user = new Users();
      const roleIdCount = await this.usersRepository.findAndCount({
        where: { role: role },
      });
      const sequenceNumber = roleIdCount[1] + 1;
      user.userId = `${role}${sequenceNumber}`;
      user.email = email;
      user.password = this.helper.encodePassword(password);
      user.role = role;
      //   user.usersToRoles = userRoles;
      //   user.createdDate = new Date();
      //   user.userProfile = userProfileData;
      const saveUser = await this.usersRepository.save(user);
      console.log('saveUser:::', saveUser);
      return saveUser;
    } catch (error) {
      console.log('error:::', error);
      throw error;
    }
  }

  public async login(body: LoginDto) {
    try {
      const { email, password }: LoginDto = body;
      const user = await this.usersRepository
        .createQueryBuilder('users')
        .leftJoinAndMapOne(
          'users.userProfile',
          UserProfile,
          'user_profile',
          'users.email = user_profile.email',
        )
        .where('users.email = :email', {
          email: email,
        })
        .andWhere('user_profile.email = :email', {
          email: email,
        })
        .getOne();

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const isPasswordValid: boolean = this.helper.isPasswordValid(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new HttpException('Incorrect password', HttpStatus.NOT_FOUND);
      }
      //   await this.repository.update(user.id, { lastLoginAt: new Date() });
      const accessToken = this.helper.generateToken(user);
      const userInfo: any = {
        accessToken: accessToken,
        user: user,
      };
      return userInfo;
    } catch (error) {
      throw error;
    }
  }

  //   public async refresh(user: Users): Promise<string> {
  //     this.repository.update(user.id, { lastLoginAt: new Date() });

  //     return this.helper.generateToken(user);
  //   }

  //   public async changePassword(body: ChangePasswordDto) {
  //     const { employeeCode, currentPassword, newPassword }: ChangePasswordDto =
  //       body;
  //     const user: Users = await this.repository.findOne({
  //       where: { employeeCode },
  //       relations: ['userRoles', 'userRoles.role'],
  //     });

  //     if (!user) {
  //       throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //     }

  //     const isPasswordValid: boolean = this.helper.isPasswordValid(
  //       currentPassword,
  //       user.password,
  //     );

  //     if (!isPasswordValid) {
  //       throw new HttpException(
  //         'Incorrect password for employee',
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }
  //     console.log('newPassword', newPassword);
  //     const encodedPassword = this.helper.encodePassword(newPassword);
  //     console.log('encodedPassword', encodedPassword);
  //     const updatePassword = this.repository
  //       .createQueryBuilder()
  //       .update(Users)
  //       .set({ password: encodedPassword })
  //       .where('id = :id', { id: user.id })
  //       .execute();
  //     console.log('updatePassword', updatePassword);
  //     return updatePassword;
  //   }
}
