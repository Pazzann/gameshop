import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export default class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization || request.cookies?.token;
    if (!token) throw new UnauthorizedException('Token is not defined');
    try {
      const data = await this.loginService.validate(
        token.replace('Bearer ', ''),
      );
      request.userid = data.id;
    } catch (err: any) {
      throw new UnauthorizedException(err.message);
    }

    return true;
  }
}
