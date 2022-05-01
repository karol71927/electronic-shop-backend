import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @ApiParam({
    name: 'categoryId',
    type: 'number',
  })
  @ApiQuery({
    name: 'priceLow',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'priceHigh',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'availability',
    type: 'number',
    required: false,
  })
  @Get('category/:categoryId')
  async findAllByCategory(
    @Param('categoryId') categoryId: string,
    @Query() query,
  ): Promise<Product[]> {
    return this.productsService.findAllByCategory(categoryId, query);
  }

  @Get('/recommended')
  async findAllRecommended() {
    return (await this.productsService.findAllRecommended()).slice(0, 20);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  @Roles(Role.Admin)
  async save(@Body() createProductDto: CreateProductDto) {
    this.productsService.save(createProductDto);
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: number,
    @Body() createProductDto: CreateProductDto,
  ) {
    this.productsService.update(id, createProductDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: number) {
    this.productsService.remove(id);
  }
}
