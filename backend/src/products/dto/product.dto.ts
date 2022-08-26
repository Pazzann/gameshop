import { IsArray, IsString, MaxLength } from 'class-validator';
import { GameType, Platform } from '../product.types';

export class ProductDto {
  @IsArray()
  imageIds: string[];
  @MaxLength(255)
  @IsString()
  title: string;
  @IsArray()
  platforms: Platform[];
  @IsString()
  description: string;
  @MaxLength(255)
  @IsString()
  price: string;
  @IsArray()
  tags: string[];
  @MaxLength(255)
  @IsString()
  type: GameType;
}
