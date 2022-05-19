import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtUserId } from 'src/jwt-user-id.decorator';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { CreateUserFavoriteDto } from './dto/create-user-favorite.dto';
import { GetUserFavoriteDto } from './dto/get-user-favorite.dto';
import { UserFavoritesService } from './user-favorites.service';

@Controller('user-favorites')
export class UserFavoritesController {
  constructor(private readonly userFavoritesService: UserFavoritesService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  async findAllForUser(@JwtUserId() id: number): Promise<GetUserFavoriteDto[]> {
    const raw = await this.userFavoritesService.findAllForUser(id);
    const dto: GetUserFavoriteDto[] = [];
    raw.forEach((value) => {
      dto.push(GetUserFavoriteDto.convertRawToDto(value));
    });
    return dto;
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  async addFavorite(
    @Body() createUserFavoriteDto: CreateUserFavoriteDto,
    @JwtUserId() userId: number,
  ) {
    createUserFavoriteDto.userId = userId;
    return this.userFavoritesService.addUserFavorite(createUserFavoriteDto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  async deleteFavorite(@Param('id') id: number, @JwtUserId() userId: number) {
    return this.userFavoritesService.deleteUserFavorite(id, userId);
  }
}
