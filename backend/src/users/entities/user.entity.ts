import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  userid: string;
  @Column()
  userName: string;
  @Column()
  userImageId: string;
  @Column()
  access: number;
  @Column({ type: 'simple-array'})
  basket: number[];
  @OneToMany(()=>ReviewEntity, (review)=>review.user)
  reviews: ReviewEntity[];
  @ManyToMany(()=>ReviewEntity, (review)=>review.likes)
  likes: ReviewEntity[];
}
