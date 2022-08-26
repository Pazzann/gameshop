import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import LoginGuard from 'src/users/login/login.guard';
import { ReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';

@UseGuards(LoginGuard)
@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post('/:productcode')
  newReview(
    @Param('productcode') productCode: number,
    @Body() reviewDto: ReviewDto,
    @Req() req: any,
  ) {
    return this.reviewService.postNew(req.userid, productCode, reviewDto);
  }

  @Put('/:productcode/:reviewid')
  changeReview(
    @Param('productcode') productCode: number,
    @Param('reviewid') reviewId,
    @Body() reviewDto: ReviewDto,
    @Req() req: any,
  ) {
    return this.reviewService.update(
      req.userid,
      productCode,
      reviewDto,
      reviewId,
    );
  }

  @Delete('/:productcode/:reviewid')
  deleteReview(
    @Param('productcode') productCode: number,
    @Param('reviewid') reviewId,
    @Req() req: any,
  ) {
    return this.reviewService.delete(req.userid, productCode, reviewId);
  }

  @Patch('/:productcode/:reviewid')
  addLike(
    @Param('productcode') productCode: number,
    @Param('reviewid') reviewId,
    @Req() req: any,
  ) {
    return this.reviewService.addLike(req.userid, productCode, reviewId);
  }
}
