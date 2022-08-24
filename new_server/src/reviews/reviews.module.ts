import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './review';

@Module({
  providers: [ReviewService, Review]
})
export class ReviewsModule {}
