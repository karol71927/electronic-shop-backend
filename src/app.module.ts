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
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/role.guard';
import { CategoriesModule } from './categories/categories.module';
import { CartsModule } from './carts/carts.module';
import { PersonalDataModule } from './personal-data/personal-data.module';
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
    ProductOrderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(ProductsController);
  }
}
