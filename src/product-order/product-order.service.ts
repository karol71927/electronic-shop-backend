import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartsService } from 'src/carts/carts.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Connection, Repository } from 'typeorm';
import { CreateProductOrderDto } from './dto/product-order.dto';
import { ProductOrder } from './product-order.entity';

@Injectable()
export class ProductOrderService {
  constructor(
    @InjectRepository(ProductOrder)
    private readonly productOrderRepository: Repository<ProductOrder>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly cartService: CartsService,
    private readonly connection: Connection,
  ) {}

  findAll(): Promise<ProductOrder[]> {
    return this.productOrderRepository.find();
  }

  findOne(id: number): Promise<ProductOrder> {
    return this.productOrderRepository.findOne(id);
  }

  async findAllForUser(userId: number) {
    const query = this.productOrderRepository
      .createQueryBuilder('po')
      .innerJoinAndSelect('product', 'p', 'p.id = po.product_id')
      .where('po.user_id = :userId', { userId: userId })
      .orderBy('po.date', 'DESC');
    console.log(query.getSql());
    return query.getRawMany();
  }

  async saveOrders(userId: number) {
    const carts = await this.cartService.findForUser(userId);
    const date = new Date();
    const productOrders: ProductOrder[] = carts.map((cart) => {
      let productOrder = new ProductOrder();
      productOrder.productId = cart.productId;
      productOrder.userId = userId;
      productOrder.amount = cart.amount;
      productOrder.date = date;
      return productOrder;
    });
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let productOrder of productOrders) {
        await queryRunner.manager.save(productOrder);
      }
      for (let cart of carts) {
        await queryRunner.manager.remove(cart);
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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
