import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserOrderDto } from './dto/create-user-order.dto';
import { UserOrder } from './user-order.entity';

@Injectable()
export class UserOrderService {
  constructor(
    @InjectRepository(UserOrder)
    private userOrderRepository: Repository<UserOrder>,
  ) {}

  findAll(): Promise<UserOrder[]> {
    return this.userOrderRepository.find();
  }

  findOne(id: number): Promise<UserOrder> {
    return this.userOrderRepository.findOne(id);
  }

  create(userOrder: UserOrder) {
    this.userOrderRepository.create(userOrder);
  }

  async update(id: number, createUserOrderDto: CreateUserOrderDto) {
    let userOrder = await this.userOrderRepository.findOne(id);
    userOrder = createUserOrderDto as unknown as UserOrder;
    return this.userOrderRepository.save(userOrder);
  }

  async remove(id: number): Promise<void> {
    await this.userOrderRepository.delete(id);
  }
}
