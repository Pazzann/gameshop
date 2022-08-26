import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { LoginModule } from './login/login.module';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  providers: [UserService],
  controllers: [UsersController],
  imports: [LoginModule, TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService]
})
export class UsersModule {}
