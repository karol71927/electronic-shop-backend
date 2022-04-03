import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cart } from 'src/carts/carts.entity';
import { Category } from 'src/categories/categories.entity';
import { PersonalData } from 'src/personal-data/personal-data.entity';
import { ProductOrder } from 'src/product-order/product-order.entity';
import { Product } from 'src/products/products.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config: TypeOrmModuleOptions = {
          type: 'mysql',
          host: configService.get('DATABASE_HOST'),
          port: parseInt(configService.get('DATABASE_PORT')),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE'),
          entities: [Product, Category, Cart, ProductOrder, PersonalData, User],
        };
        return config;
      },
    }),
  ],
})
export class DatabaseModule {}
