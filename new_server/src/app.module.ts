import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import config from "../config.json";
import {User} from "./entity/User";
import {Review} from "./entity/Review";
import {Product} from "./entity/Product";
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ImagesModule } from './images/images.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: config.SQLHost,
            port: +config.SQLPort,
            username: config.SQLUserName,
            password: config.SQLPassword,
            database: config.SQLDatabase,
            entities: [User, Review, Product],
            synchronize: true,
        }),
        ProductsModule,
        UsersModule,
        ReviewsModule,
        ImagesModule,],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
