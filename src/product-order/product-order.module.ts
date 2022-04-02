import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrderController } from './product-order.controller';
import { ProductOrder } from './product-order.entity';
import { ProductOrderService } from './product-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrder])],
  controllers: [ProductOrderController],
  providers: [ProductOrderService],
})
export class ProductOrderModule {}
