import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameType, Platform } from '../product.types';
import { ReviewEntity } from '../../reviews/entities/review.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public code: number;
  @Column({ type: 'simple-array' })
  public imageIds: string[];
  @Column()
  public title: string;
  @Column({
    type: 'text',
  })
  public description: string;
  @Column({ type: 'simple-array' })
  public platforms: Platform[];
  @Column()
  public price: string;
  @Column({ type: 'simple-array' })
  public tags: string[];
  @Column()
  public type: GameType;
  @OneToMany(() => ReviewEntity, (review) => review.product)
  reviews: ReviewEntity[];
}
