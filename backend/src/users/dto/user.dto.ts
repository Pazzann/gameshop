import {
  IsArray,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @MinLength(18)
  @MaxLength(18)
  @IsString()
  userid: string;
  @IsString()
  userName: string;
  @IsString()
  userImageId: string;
  @IsNumber()
  access: number;
  @IsArray()
  basket: number[];
}
