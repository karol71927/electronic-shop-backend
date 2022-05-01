import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { getManager, Repository } from 'typeorm';
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

  findAllByCategory(categoryId: string, filters: any): Promise<Product[]> {
    const entityManager = getManager();
    const query = `select p.* from product p \
      where p.category_id = ${categoryId} \
      ${filters.priceLow ? `AND p.price >= ${filters.priceLow}` : ''}\
      ${filters.priceHigh ? `AND p.price <= ${filters.priceHigh}` : ''}\
      ${
        filters.availability
          ? `AND p.availability = ${filters.availability}`
          : ''
      }`;
    return entityManager.query(query);
  }

  findAllRecommended(): Promise<Product[]> {
    const query = `select p.* from product p \
      where p.bestseller = 1`;
    return getManager().query(query);
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
