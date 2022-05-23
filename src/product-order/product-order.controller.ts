import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtUserId } from 'src/jwt-user-id.decorator';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { GetProductOrderDto } from './dto/get-product-order.dto';
import { CreateProductOrderDto } from './dto/product-order.dto';
import { ProductOrder } from './product-order.entity';
import { ProductOrderService } from './product-order.service';

@Controller('product-order')
export class ProductOrderController {
  constructor(private productOrderService: ProductOrderService) {}

  // @Get()
  // async findAll(): Promise<ProductOrder[]> {
  //   return this.productOrderService.findAll();
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: number): Promise<ProductOrder> {
  //   return this.productOrderService.findOne(id);
  // }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  async getOrders(@JwtUserId() userId: number) {
    const raw = await this.productOrderService.findAllForUser(userId);
    console.log(raw);
    const dto = raw.map((x) => GetProductOrderDto.convertRawToDto(x));
    return dto;
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  async save(@JwtUserId() userId: number) {
    return this.productOrderService.saveOrders(userId);
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() createProductOrderDto: CreateProductOrderDto,
  // ) {
  //   this.productOrderService.update(id, createProductOrderDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: number) {
  //   this.productOrderService.remove(id);
  // }
}
