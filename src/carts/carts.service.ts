import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './carts.entity';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartsRepository: Repository<Cart>,
  ) {}

  findAll(): Promise<Cart[]> {
    return this.cartsRepository.find();
  }

  findOne(id: number): Promise<Cart> {
    return this.cartsRepository.findOne(id);
  }

  create(cart: Cart) {
    this.cartsRepository.create(cart);
  }

  async update(id: number, createCartDto: CreateCartDto) {
    let cart = await this.cartsRepository.findOne(id);
    cart = createCartDto as unknown as Cart;
    return this.cartsRepository.save(cart);
  }

  async remove(id: number): Promise<void> {
    await this.cartsRepository.delete(id);
  }
}
