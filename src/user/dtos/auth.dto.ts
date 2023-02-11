import {
  IsDefined,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from '@nestjs/class-validator';

export class RegisterDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({ example: 'johndoe@getnada.com' })
  public readonly email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly password: string;

  @IsString()
  @ApiProperty({ example: 'John' })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  public readonly firstName: string;

  @IsString()
  @ApiProperty({ example: 'Doe' })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  public readonly lastName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'POWER USER' })
  public readonly role: string;
}

export class LoginDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({ example: 'johndoe@getnada.com' })
  public readonly email: string;

  @IsString()
  @ApiProperty({ example: 'John3535' })
  public readonly password: string;
}

// export class ChangePasswordDto {
//   @IsString()
//   @ApiProperty({ example: 'ABC-12' })
//   public readonly employeeCode: string;

//   @IsString()
//   @ApiProperty({ example: 'John3535' })
//   public readonly currentPassword: string;

//   @IsString()
//   @ApiProperty({ example: 'John4545' })
//   public readonly newPassword: string;
// }
