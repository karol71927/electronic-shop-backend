import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { ProductOrderController } from './product-order.controller';
import { ProductOrder } from './product-order.entity';
import { ProductOrderService } from './product-order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductOrder]),
    ProductsModule,
    UsersModule,
  ],
  controllers: [ProductOrderController],
  providers: [ProductOrderService],
})
export class ProductOrderModule {}
