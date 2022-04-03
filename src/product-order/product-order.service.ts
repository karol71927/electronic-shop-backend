import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateProductOrderDto } from './dto/product-order.dto';
import { ProductOrder } from './product-order.entity';

@Injectable()
export class ProductOrderService {
  constructor(
    @InjectRepository(ProductOrder)
    private productOrderRepository: Repository<ProductOrder>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  findAll(): Promise<ProductOrder[]> {
    return this.productOrderRepository.find();
  }

  findOne(id: number): Promise<ProductOrder> {
    return this.productOrderRepository.findOne(id);
  }

  async save(createProductOrderDto: CreateProductOrderDto) {
    let productOrder = createProductOrderDto as unknown as ProductOrder;
    productOrder.product = await this.productsService.findOne(
      createProductOrderDto.productId,
    );
    productOrder.user = await this.usersService.findOne(
      createProductOrderDto.userId,
    );
    this.productOrderRepository.save(productOrder);
  }

  async update(id: number, createProductOrderDto: CreateProductOrderDto) {
    let productOrder = await this.findOne(id);
    productOrder.amount = createProductOrderDto.amount;
    productOrder.date = createProductOrderDto.date;
    return this.productOrderRepository.update(id, productOrder);
  }

  async remove(id: number): Promise<void> {
    await this.productOrderRepository.delete(id);
  }
}
