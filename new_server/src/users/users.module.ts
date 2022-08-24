import { Module } from '@nestjs/common';
import { User } from './user';
import { UserService } from './user.service';
import { LoginModule } from './users/login/login.module';

@Module({
  providers: [User, UserService],
  imports: [LoginModule]
})
export class UsersModule {}
