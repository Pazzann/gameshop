import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { ReviewDto } from './dto/review.dto';
import { ReviewEntity } from './entities/review.entity';
import { ProductEntity } from '../products/entities/product.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity) private reviewRep: Repository<ReviewEntity>,
    private userService: UserService,
    @InjectRepository(ProductEntity)
    private productRep: Repository<ProductEntity>,
  ) {}

  async postNew(userId: string, productCode: number, data: ReviewDto) {
    const curUser = await this.userService.getUser(userId);
    const product = await this.productRep.findOne({
      where: { code: productCode },
    });
    if (!product) throw new BadRequestException("Product doesn't exists");
    await ReviewEntity.create({
      text: data.text,
      attachments: data.attachments,
      rating: data.rating,
      user: curUser,
      product: product,
      likes: [],
    }).save();
    return true;
  }

  async update(
    userId: string,
    productCode: number,
    data: ReviewDto,
    reviewId: number,
  ) {
    const curUser = await this.userService.getUser(userId);
    const review = await this.reviewRep.findOne({
      where: {
        id: reviewId,
      },
      relations: ['user', 'product'],
    });
    if (!review) throw new BadRequestException("Review doesn't exists");
    if (productCode != review.product.code)
      throw new BadRequestException('Invalid Request');
    if (curUser.userid !== review.user.userid || curUser.access !== 1)
      throw new BadRequestException('Access denied');

    review.text = data.text;
    review.attachments = data.attachments;
    review.rating = data.rating;
    await review.save();

    return true;
  }

  async delete(userId: string, productCode: number, reviewId: number) {
    const curUser = await this.userService.getUser(userId);
    const review = await this.reviewRep.findOne({
      where: {
        id: reviewId,
      },
      relations: ['user', 'product'],
    });
    if (!review) throw new BadRequestException("Review doesn't exists");
    if (productCode != review.product.code)
      throw new BadRequestException('Invalid Request');
    if (curUser.userid !== review.user.userid || curUser.access !== 1)
      throw new BadRequestException('Access denied');

    await review.remove();

    return true;
  }

  async addLike(userId: string, productCode: number, reviewId: number) {
    const curUser = await this.userService.getUser(userId);
    const review = await this.reviewRep.findOne({
      where: {
        id: reviewId,
      },
      relations: ['user', 'product', 'likes'],
    });
    if (!review) throw new BadRequestException("Review doesn't exists");
    if (productCode != review.product.code)
      throw new BadRequestException('Invalid Request');
    review.likes.map((user) => {
      if (user.userid) throw new BadRequestException('Like is already placed!');
    });
    review.likes.push(curUser);
    await review.save();
    return true;
  }
}
