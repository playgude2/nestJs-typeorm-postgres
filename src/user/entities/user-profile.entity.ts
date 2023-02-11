import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { IsDefined, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from '@nestjs/class-validator';
import { Roles } from 'src/roles/entities/roles.entity';
import { AbstractEntity } from 'src/common/common-entities/base.entity';

@Entity('user_profile')
export class UserProfile extends AbstractEntity {
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @Column({ type: 'varchar', nullable: false })
  @IsDefined({ always: true })
  @IsString({ always: true })
  public firstName: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar' })
  @IsDefined({ always: true })
  @IsString({ always: true })
  public lastName!: string;

  @Column({ type: 'varchar', nullable: true })
  @IsEmail()
  @IsDefined({ always: true })
  public email: string;
}
