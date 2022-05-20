import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Cart } from './carts.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { GetCartDto, GetCartWithTotalPriceDto } from './dto/get-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartsRepository: Repository<Cart>,
    private productsService: ProductsService,
    private usersService: UsersService,
  ) {}

  findAll(): Promise<Cart[]> {
    return this.cartsRepository.find();
  }

  findOne(id: number): Promise<Cart> {
    return this.cartsRepository.findOne(id);
  }

  findAllForUser(id: number): Promise<any[]> {
    const query = this.cartsRepository
      .createQueryBuilder('c')
      .innerJoinAndSelect('product', 'p', 'p.id = c.product_id')
      .where('user_id = :userId', { userId: id });
    return query.getRawMany();
  }

  findForUser(id: number): Promise<Cart[]> {
    return this.cartsRepository.find({ userId: id });
  }

  calculateTotalPrice(items: GetCartDto[]): GetCartWithTotalPriceDto {
    const itemsWithPrice: GetCartWithTotalPriceDto = {
      totalPrice: 0,
      items: items,
    };
    items.forEach((item) => {
      itemsWithPrice.totalPrice += item.price * item.cartAmount;
    });
    return itemsWithPrice;
  }

  async save(createCartDto: CreateCartDto) {
    let cart = createCartDto as unknown as Cart;
    const isInDb = await this.cartsRepository
      .createQueryBuilder('c')
      .where('product_id = :productId AND user_id = :userId', {
        productId: createCartDto.productId,
        userId: createCartDto.userId,
      })
      .getOne();
    console.log(isInDb);
    if (isInDb) {
      createCartDto.amount += isInDb.amount;
      return this.update(isInDb.id, createCartDto);
    }
    cart.product = await this.productsService.findOne(createCartDto.productId);
    cart.user = await this.usersService.findOne(createCartDto.userId);
    this.cartsRepository.save(cart);
  }

  async update(id: number, createCartDto: CreateCartDto) {
    let cart = await this.findOne(id);
    cart.amount = createCartDto.amount;
    return this.cartsRepository.update(id, cart);
  }

  async remove(id: number): Promise<void> {
    await this.cartsRepository.delete(id);
  }
}
