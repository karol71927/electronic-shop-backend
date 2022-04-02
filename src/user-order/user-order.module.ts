import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrderController } from './user-order.controller';
import { UserOrder } from './user-order.entity';
import { UserOrderService } from './user-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrder])],
  controllers: [UserOrderController],
  providers: [UserOrderService],
})
export class UserOrderModule {}
