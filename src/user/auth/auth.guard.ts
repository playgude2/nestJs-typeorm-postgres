import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Users } from '../entities/user.entity';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public handleRequest(err: unknown, user: Users): any {
    if (user) {
      console.log('user:::11111', user);

      return user;
    } else {
      throw new UnauthorizedException(err);
    }
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const user: Request = context.switchToHttp().getRequest();
    console.log('user:::222', user);
    // const request = context.switchToHttp().getRequest();
    // return request.user;
    return user ? true : false;
  }
}
