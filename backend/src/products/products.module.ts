import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { LoginModule } from '../users/login/login.module';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    LoginModule,
    UsersModule,
  ],
})
export class ProductsModule {}
