import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Product } from './entity/Product';
import { Review } from './entity/Review';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [User, Review, Product],
  migrations: [],
  subscribers: [],
});
