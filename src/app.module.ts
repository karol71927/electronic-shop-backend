import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './logger-middleware/logger-middleware';
import { ProductsController } from './products/products.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';
import { CartsController } from './carts/carts.controller';
import { CartsService } from './carts/carts.service';
import { CartsModule } from './carts/carts.module';
import { PersonalDataController } from './personal-data/personal-data.controller';
import { PersonalDataService } from './personal-data/personal-data.service';
import { PersonalDataModule } from './personal-data/personal-data.module';
import { UserOrderController } from './user-order/user-order.controller';
import { UserOrderService } from './user-order/user-order.service';
import { UserOrderModule } from './user-order/user-order.module';
import { ProductOrderController } from './product-order/product-order.controller';
import { ProductOrderService } from './product-order/product-order.service';
import { ProductOrderModule } from './product-order/product-order.module';

@Module({
  imports: [
    DatabaseModule,
    ProductsModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    CategoriesModule,
    CartsModule,
    PersonalDataModule,
    UserOrderModule,
    ProductOrderModule,
  ],
  controllers: [AppController, CategoriesController, CartsController, PersonalDataController, UserOrderController, ProductOrderController],
  providers: [AppService, CategoriesService, CartsService, PersonalDataService, UserOrderService, ProductOrderService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(ProductsController);
  }
}
