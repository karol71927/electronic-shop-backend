import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    let product = createProductDto as unknown as Product;
    this.productService.create(product);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createProductDto: CreateProductDto,
  ) {
    this.productService.update(id, createProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.productService.remove(id);
  }
}
