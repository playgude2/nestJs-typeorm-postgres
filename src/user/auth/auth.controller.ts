import {
  Body,
  Controller,
  Inject,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Req,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '../dtos/auth.dto';

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'Create one admin',
    description: 'Create one admin',
  })
  private adminRegister(@Body() body: RegisterDto) {
    return this.service.adminRegister(body);
  }

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'Create one user login',
    description: 'Create one user login',
  })
  private login(@Body() body: LoginDto) {
    try {
      return this.service.login(body);
    } catch (err) {
      throw err;
    }
  }

  //   @Post('refresh')
  //   @UseGuards(JwtAuthGuard)
  //   @ApiOperation({
  //     summary: 'Create one refresh token',
  //     description: 'Create one refresh token',
  //   })
  //   private refresh(@Req() user: Request): Promise<string | never> {
  //     return this.service.refresh(<Users>user);
  //   }

  //   @ApiBearerAuth()
  //   @Put('change-password')
  //   @UseGuards(JwtAuthGuard)
  //   @UseInterceptors(ClassSerializerInterceptor)
  //   @ApiOperation({
  //     summary: 'Change user password.',
  //     description: 'Change user password.',
  //   })
  //   public changePassword(@Body() body: ChangePasswordDto) {
  //     console.log('changePassword', body);
  //     return this.service.changePassword(body);
  //   }
}
