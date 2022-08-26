import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { Response } from 'express';
import { readdir, readFile } from 'fs/promises';
import * as path from 'path';

@Controller('images')
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Get('/assets/:name')
  async getImage(@Param('name') imageName: string, @Res() res: Response) {
    const files = await readdir('./assets');
    if (!files.includes(imageName)) throw new BadRequestException();
    res.sendFile(path.resolve(__dirname + `/../../assets/${imageName}`));
  }
}
