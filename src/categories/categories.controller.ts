import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Category } from './categories.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Post()
  async save(@Body() createCategoryDto: CreateCategoryDto) {
    this.categoriesService.save(createCategoryDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    this.categoriesService.update(id, createCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.categoriesService.remove(id);
  }
}
