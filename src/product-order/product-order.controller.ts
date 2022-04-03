import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductOrderDto } from './dto/product-order.dto';
import { ProductOrder } from './product-order.entity';
import { ProductOrderService } from './product-order.service';

@Controller('product-order')
export class ProductOrderController {
  constructor(private productOrderService: ProductOrderService) {}

  @Get()
  async findAll(): Promise<ProductOrder[]> {
    return this.productOrderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProductOrder> {
    return this.productOrderService.findOne(id);
  }

  @Post()
  async save(@Body() createProductOrderDto: CreateProductOrderDto) {
    this.productOrderService.save(createProductOrderDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createProductOrderDto: CreateProductOrderDto,
  ) {
    this.productOrderService.update(id, createProductOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.productOrderService.remove(id);
  }
}
