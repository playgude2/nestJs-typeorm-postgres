import { IsDefined, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { AbstractEntity } from 'src/common/common-entities/base.entity';
import { Users } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Roles extends AbstractEntity {
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @Column({ type: 'varchar' })
  @IsDefined({ always: true })
  @IsString({ always: true })
  @ApiProperty({ example: 'ADMIN' })
  public role!: string;

  //   @OneToMany(() => Users, (users) => users.roles)
  //   public users: Users;
}
