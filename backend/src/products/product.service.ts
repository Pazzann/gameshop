import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { UserService } from '../users/users.service';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRep: Repository<ProductEntity>,
    private userService: UserService,
  ) {}
  getAll() {
    return this.productRep.find({
      relations: ['reviews', 'reviews.user'],
    });
  }
  getOne(id: number) {
    return this.productRep.findOne({
      where: {
        code: id,
      },
      relations: ['reviews', 'reviews.user'],
    });
  }
  async postNew(userId: string, newProduct: ProductDto) {
    const curUser = await this.userService.getUser(userId);
    if (curUser.access !== 1)
      throw new BadRequestException("You've no rights to do this action!");

    await ProductEntity.create({
      title: newProduct.title,
      description: newProduct.description,
      imageIds: newProduct.imageIds,
      platforms: newProduct.platforms,
      price: newProduct.price,
      tags: newProduct.tags,
      type: newProduct.type,
    }).save();

    return true;
  }
  async change(userId: string, changedProduct: ProductDto, productId: number) {
    const curUser = await this.userService.getUser(userId);
    if (curUser.access !== 1)
      throw new BadRequestException("You've no rights to do this action!");
    const product = await this.productRep.findOneBy({ code: productId });
    if (!product) throw new BadRequestException("This product doesn't exist!");

    product.title = changedProduct.title;
    product.description = changedProduct.description;
    product.imageIds = changedProduct.imageIds;
    product.platforms = changedProduct.platforms;
    product.price = changedProduct.price;
    product.tags = changedProduct.tags;
    product.type = changedProduct.type;
    await product.save();

    return true;
  }
  async delete(userId: string, productId: number) {
    const curUser = await this.userService.getUser(userId);
    if (curUser.access !== 1)
      throw new BadRequestException("You've no rights to do this action!");
    const product = await this.productRep.findOneBy({ code: productId });
    console.log(product);
    if (!product) throw new BadRequestException("This product doesn't exist!");
    await product.softRemove();
    return true;
  }
}
