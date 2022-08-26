import { IsArray, IsString } from 'class-validator';
import { Rating } from '../review.types';

export class ReviewDto {
  @IsString()
  text: string;
  @IsString()
  rating: Rating;
  @IsArray()
  attachments: string[];
}
