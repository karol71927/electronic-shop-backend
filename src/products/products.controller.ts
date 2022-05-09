import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Response,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtUserId } from 'src/jwt-user-id.decorator';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@ApiTags('products')
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

  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @Post()
  @Roles(Role.Admin)
  async save(@Body() createProductDto: CreateProductDto) {
    this.productsService.save(createProductDto);
  }

  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @Put(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: number,
    @Body() createProductDto: CreateProductDto,
  ) {
    this.productsService.update(id, createProductDto);
  }

  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: number) {
    this.productsService.remove(id);
  }
}
