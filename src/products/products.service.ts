import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    return this.products.filter((product) => product.id === id)[0];
  }

  create(product: Product) {
    this.products.push(product);
  }

  update(id: number, createProductDto: CreateProductDto) {
    let foundProduct = this.products.find((product) => product.id === id);
    let index = this.products.indexOf(foundProduct);
    this.products.splice(index, 1, createProductDto);
  }

  remove(id: number) {
    let foundProduct = this.products.find((product) => product.id === id);
    foundProduct.availability = false;
    let index = this.products.indexOf(foundProduct);
    this.products.splice(index, 1, foundProduct);
  }
}
