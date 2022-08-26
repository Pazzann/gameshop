import { UserEntity } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';
import { Rating } from '../review.types';

@Entity('comments')
export class ReviewEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'text',
  })
  text: string;
  @Column({ type: 'simple-array' })
  attachments: string[];
  @Column()
  rating: Rating;
  @ManyToOne(() => ProductEntity, (product) => product.reviews)
  product: ProductEntity;
  @ManyToOne(() => UserEntity, (user) => user.reviews)
  user: UserEntity;
  @ManyToMany(() => UserEntity, (user) => user.likes)
  @JoinTable()
  likes: UserEntity[];
}
