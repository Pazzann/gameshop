import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Res,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { Response } from 'express';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Redirect('http://localhost:5173/')
  @Get('/callback')
  async loginUser(@Query('code') Query: string, @Res() res: Response) {
    res.cookie('token', await this.loginService.login(Query));
  }
}
