import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { LoginModule } from 'src/users/login/login.module';
import { UsersModule } from 'src/users/users.module';
import { ProductEntity } from '../products/entities/product.entity';

@Module({
  providers: [ReviewService],
  controllers: [ReviewController],
  imports: [
    TypeOrmModule.forFeature([ReviewEntity]),
    TypeOrmModule.forFeature([ProductEntity]),
    LoginModule,
    UsersModule,
  ],
})
export class ReviewsModule {}
