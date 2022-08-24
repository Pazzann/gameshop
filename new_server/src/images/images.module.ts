import { Module } from '@nestjs/common';
import { Image } from './image';
import { ImageService } from './image.service';

@Module({
  providers: [Image, ImageService]
})
export class ImagesModule {}
