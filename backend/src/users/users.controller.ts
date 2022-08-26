import { Controller, Delete, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import LoginGuard from './login/login.guard';
import { UserService } from './users.service';
import { Request } from 'express';

@UseGuards(LoginGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}
  
  @Get('/me')
  getUser(@Req() req: any) {
    return this.usersService.getUser(req.userid);
  }
  
  @Put('/basket/:id')
  putInBasket(@Param("id") productId: number, @Req() req: any){
    return this.usersService.putInBasket(productId, req.userid);
  }

  @Delete('/basket/:id')
  deleteFromBasket(@Param("id") productId: number, @Req() req: any){
    return this.usersService.deleteFromBasket(productId, req.userid);
  }
}
