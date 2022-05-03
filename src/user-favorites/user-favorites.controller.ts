import { Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { CreateUserFavoriteDto } from './dto/create-user-favorite';
import { GetUserFavoriteDto } from './dto/get-user-favorite';
import { UserFavoritesService } from './user-favorites.service';

@Controller('user-favorites')
export class UserFavoritesController {
  constructor(private readonly userFavoritesService: UserFavoritesService) {}

  @Get('/user/:id')
  async findAllForUser(@Param('id') id: number): Promise<GetUserFavoriteDto[]> {
    const raw = await this.userFavoritesService.findAllForUser(id);
    const dto: GetUserFavoriteDto[] = [];
    raw.forEach((value) => {
      dto.push(GetUserFavoriteDto.convertRawToDto(value));
    });
    return dto;
  }

  @Post('/')
  async addFavorite(createUserFavoriteDto: CreateUserFavoriteDto) {
    return this.userFavoritesService.addUserFavorite(createUserFavoriteDto);
  }

  @Delete('/:id')
  async deleteFavorite(@Param('id') id: number) {
    return this.userFavoritesService.deleteUserFavorite(id);
  }
}
