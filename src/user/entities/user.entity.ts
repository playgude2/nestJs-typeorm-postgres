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

@Entity('users')
export class Users extends AbstractEntity {
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @Column({ type: 'varchar', nullable: false })
  @IsDefined({ always: true })
  @IsString({ always: true })
  public userId: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar' })
  @IsDefined({ always: true })
  @IsString({ always: true })
  public password!: string;

  @Column({ type: 'varchar', nullable: true })
  @IsEmail()
  @IsDefined({ always: true })
  public email: string;

  //   @Column({ type: 'timestamp', nullable: true, default: null })
  //   public lastLoginAt: Date | null;

  //   @Column({ type: 'timestamp', nullable: true, default: null })
  //   public createdDate: Date | null;

  //   @Column({ nullable: true })
  //   @IsDefined({ always: true })
  //   @IsNumber()
  //   @ApiProperty({ example: 1 })
  //   public role_id!: number;

  //   @ManyToOne(() => Roles, (roles) => roles.users)
  //   @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  //   public roles: Roles;

  @Column({ nullable: true })
  @IsDefined({ always: true })
  @IsString()
  @ApiProperty({ example: 'POWER USER' })
  public role!: string;
}
