import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  findOne(id: number): Promise<Category> {
    return this.categoriesRepository.findOne(id);
  }

  async create(category: CreateCategoryDto): Promise<CreateCategoryDto> {
    const created = await this.categoriesRepository.save(category);
    return created;
  }

  async update(id: number, createCategoryDto: CreateCategoryDto) {
    let category = await this.categoriesRepository.findOne(id);
    category = createCategoryDto as unknown as Category;
    return this.categoriesRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
