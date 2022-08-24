import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { Login } from './login';

@Module({
  providers: [LoginService, Login]
})
export class LoginModule {}
