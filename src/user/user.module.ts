import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/roles/entities/roles.entity';
import { AuthModule } from './auth/auth.module';
import { UserProfile } from './entities/user-profile.entity';
import { Users } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Roles, Users, UserProfile]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
