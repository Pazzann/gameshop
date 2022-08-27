import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import LoginGuard from '../users/login/login.guard';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('/')
  getAll() {
    return this.productService.getAll();
  }
  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.productService.getOne(id);
  }
  @UseGuards(LoginGuard)
  @Post('/')
  newProduct(@Body() product: ProductDto, @Req() req: any) {
    return this.productService.postNew(req.userid, product);
  }
  @UseGuards(LoginGuard)
  @Put('/:id')
  changeProduct(
    @Body() product: ProductDto,
    @Req() req: any,
    @Param('id') productId,
  ) {
    return this.productService.change(req.userid, product, productId);
  }
  @UseGuards(LoginGuard)
  @Delete('/:id')
  deleteProduct(@Param('id') productId, @Req() req: any) {
    return this.productService.delete(req.userid, productId);
  }
}
