import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductOrderDto } from './dto/product-order.dto';
import { ProductOrder } from './product-order.entity';

@Injectable()
export class ProductOrderService {
  constructor(
    @InjectRepository(ProductOrder)
    private productOrderRepository: Repository<ProductOrder>,
  ) {}

  findAll(): Promise<ProductOrder[]> {
    return this.productOrderRepository.find();
  }

  findOne(id: number): Promise<ProductOrder> {
    return this.productOrderRepository.findOne(id);
  }

  create(productOrder: ProductOrder) {
    this.productOrderRepository.create(productOrder);
  }

  async update(id: number, createProductOrderDto: CreateProductOrderDto) {
    let productOrder = await this.productOrderRepository.findOne(id);
    productOrder = createProductOrderDto as unknown as ProductOrder;
    return this.productOrderRepository.save(productOrder);
  }

  async remove(id: number): Promise<void> {
    await this.productOrderRepository.delete(id);
  }
}
