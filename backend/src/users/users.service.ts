import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRep: Repository<UserEntity>,
  ) {}

  async getUser(id: string) {
    return this.userRep.findOneBy({ userid: id });
  }

  async putInBasket(productId: number, userId: string): Promise<boolean> {
    const curUser = await this.userRep.findOneBy({ userid: userId });
    if (!curUser.basket.includes(productId)) {
      curUser.basket.push(productId);
      curUser.save();
      return true;
    }
    return false;
  }

  async deleteFromBasket(productId: number, userId: string): Promise<boolean> {
    const curUser = await this.userRep.findOneBy({ userid: userId });
    if (curUser.basket.includes(productId)) {
      curUser.basket = curUser.basket.filter((id: number) => id !== productId);
      curUser.save();
      return true;
    }
    return false;
  }
}
