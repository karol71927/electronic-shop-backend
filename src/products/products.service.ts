import { BadRequestException, Injectable } from '@nestjs/common';
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

  async findAllByCategory(
    categoryId: string,
    filters: any,
  ): Promise<Product[]> {
    const query = this.productsRepository
      .createQueryBuilder('product')
      .where('product.category_id = :categoryId', { categoryId: categoryId });

    if (filters.priceLow) {
      query.andWhere('price >= :priceLow', { priceLow: filters.priceLow });
    }
    if (filters.priceHigh) {
      query.andWhere('price <= :priceHigh', { priceHigh: filters.priceHigh });
    }
    if (filters.availability) {
      query.andWhere('availability = :availability', {
        availability: filters.availability,
      });
    }
    return query.getMany();
  }

  findAllRecommended(): Promise<Product[]> {
    return this.productsRepository
      .createQueryBuilder('product')
      .where('product.bestseller = 1')
      .limit(20)
      .getMany();
  }

  findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne(id);
  }

  async save(createProductDto: CreateProductDto) {
    let product = createProductDto as unknown as Product;
    product.category = await this.categoriesService.findByName(
      createProductDto.category,
    );
    this.productsRepository.save(product).catch((err) => {
      throw new BadRequestException(err);
    });
  }

  async update(id: number, createProductDto: CreateProductDto) {
    let product = createProductDto as unknown as Product;
    const found = await this.findOne(product.id);
    product.categoryId = found.categoryId;
    return this.productsRepository.update(id, product).catch((err) => {
      throw new BadRequestException(err);
    });
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id).catch((err) => {
      throw new BadRequestException();
    });
  }
}
