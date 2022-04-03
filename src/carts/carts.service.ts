import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Cart } from './carts.entity';
import { CreateCartDto } from './dto/create-cart.dto';

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

  async save(createCartDto: CreateCartDto) {
    let cart = createCartDto as unknown as Cart;
    cart.product = await this.productsService.findOne(createCartDto.productId);
    cart.user = await this.usersService.findOne(createCartDto.userId);
    console.log(cart);
    this.cartsRepository.save(cart);
  }

  async update(id: number, createCartDto: CreateCartDto) {
    let cart = await this.findOne(id);
    cart.amount = createCartDto.amount;
    console.log(cart);
    return this.cartsRepository.update(id, cart);
  }

  async remove(id: number): Promise<void> {
    await this.cartsRepository.delete(id);
  }
}
