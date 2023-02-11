import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthHelper } from './auth/auth.helper';
import { RegisterDto } from './dtos/auth.dto';
import { UserProfile } from './entities/user-profile.entity';
import { Users } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(Users)
  private readonly usersRepository: Repository<Users>;
  @InjectRepository(UserProfile)
  private readonly userProfileRepository: Repository<UserProfile>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  async register(body: RegisterDto, user) {
    try {
      const { firstName, lastName, role, email, password }: RegisterDto = body;
      if (user.role === 'ADMIN') {
        let user: Users = await this.usersRepository.findOne({
          where: { email },
        });
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
        user = new Users();
        const roleIdCount = await this.usersRepository.findAndCount({
          where: { role: role },
        });
        const sequenceNumber = roleIdCount[1] + 1;
        user.userId = `${role}${sequenceNumber}`;
        user.email = email;
        user.password = this.helper.encodePassword(password);
        user.role = role;
        const saveUser = await this.usersRepository.save(user);
        return saveUser;
      } else {
        throw new HttpException('user is not an admin', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw error;
    }
  }
}
