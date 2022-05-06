import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cart } from './carts.entity';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { GetCartDto, GetCartWithTotalPriceDto } from './dto/get-cart.dto';

@Controller('carts')
@ApiTags('carts')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Get()
  async findAll(): Promise<Cart[]> {
    return this.cartsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cart> {
    return this.cartsService.findOne(id);
  }

  @Get('/user/:id')
  async findAllForUser(
    @Param('id') id: number,
  ): Promise<GetCartWithTotalPriceDto> {
    const raw = await this.cartsService.findAllForUser(id);
    const dto: GetCartDto[] = [];
    raw.forEach((element) => {
      dto.push(GetCartDto.convertRawToDto(element));
    });
    return this.cartsService.calculateTotalPrice(dto);
  }

  @Post()
  async save(@Body() createCartDto: CreateCartDto) {
    this.cartsService.save(createCartDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() createCartDto: CreateCartDto) {
    this.cartsService.update(id, createCartDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.cartsService.remove(id);
  }
}
