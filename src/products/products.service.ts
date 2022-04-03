import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private categoriesService: CategoriesService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne(id);
  }

  async save(createProductDto: CreateProductDto) {
    let product = createProductDto as unknown as Product;
    product.category = await this.categoriesService.findByName(
      createProductDto.category,
    );
    this.productsRepository.save(product);
  }

  async update(id: number, createProductDto: CreateProductDto) {
    let product = createProductDto as unknown as Product;
    product.category = await this.categoriesService.findByName(
      createProductDto.category,
    );
    return this.productsRepository.update(id, product);
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
