import { Module } from '@nestjs/common';
import { Product } from './product';
import { ProductService } from './product.service';

@Module({
  providers: [Product, ProductService]
})
export class ProductsModule {}
