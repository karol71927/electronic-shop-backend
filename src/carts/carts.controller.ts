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
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtUserId } from 'src/jwt-user-id.decorator';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { Cart } from './carts.entity';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { GetCartDto, GetCartWithTotalPriceDto } from './dto/get-cart.dto';

@Controller('carts')
@ApiTags('carts')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  async findAllForUser(
    @JwtUserId() id: number,
  ): Promise<GetCartWithTotalPriceDto> {
    const raw = await this.cartsService.findAllForUser(id);
    const dto: GetCartDto[] = [];
    raw.forEach((element) => {
      dto.push(GetCartDto.convertRawToDto(element));
    });
    return this.cartsService.calculateTotalPrice(dto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  async save(@JwtUserId() id: number, @Body() createCartDto: CreateCartDto) {
    createCartDto.userId = id;
    return this.cartsService.save(createCartDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  async update(
    @Param('id') id: number,
    @Body() createCartDto: CreateCartDto,
    @JwtUserId() userId: number,
  ) {
    createCartDto.userId = userId;
    return this.cartsService.update(id, createCartDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  async remove(@Param('id') id: number) {
    this.cartsService.remove(id);
  }
}
