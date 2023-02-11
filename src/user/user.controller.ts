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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { userInfo } from 'os';
import { JwtAuthGuard } from './auth/auth.guard';
import { RegisterDto } from './dtos/auth.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('UserController')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'Create one user',
    description: 'Create one user',
  })
  private register(@Body() body: RegisterDto, @Req() data) {
    console.log('data::', data.user);
    const user = data.user;
    return this.service.register(body, user);
  }
}
