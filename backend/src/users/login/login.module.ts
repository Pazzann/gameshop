import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import LoginGuard from './login.guard';

@Module({
  imports: [ConfigModule, JwtModule.register({ secret: 'ABOBA' })],
  providers: [LoginService, LoginGuard],
  controllers: [LoginController],
  exports: [LoginGuard, LoginService],
})
export class LoginModule {}
