import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateUserFavoriteDto } from './dto/create-user-favorite.dto';
import { UserFavorite } from './user-favorites.entity';

@Injectable()
export class UserFavoritesService {
  constructor(
    @InjectRepository(UserFavorite)
    private readonly userFavoriteRepository: Repository<UserFavorite>,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  async findOne(id: number) {
    return this.userFavoriteRepository.findOne(id);
  }

  async findAllForUser(id: number): Promise<any> {
    const query = this.userFavoriteRepository
      .createQueryBuilder('uf')
      .innerJoinAndSelect('product', 'p', 'p.id = uf.product_id')
      .where('user_id = :userId', { userId: id });
    return query.getRawMany();
  }

  async addUserFavorite(
    createUserFavoriteDto: CreateUserFavoriteDto,
  ): Promise<UserFavorite> {
    const userFavoriteEntity = new UserFavorite();
    userFavoriteEntity.product = await this.productsService.findOne(
      createUserFavoriteDto.productId,
    );
    userFavoriteEntity.user = await this.usersService.findOne(
      createUserFavoriteDto.userId,
    );
    return this.userFavoriteRepository.save(userFavoriteEntity).catch((err) => {
      throw new BadRequestException();
    });
  }

  async deleteUserFavorite(id: number, userId: number): Promise<void> {
    const found = await this.findOne(id);
    if (!found) {
      throw new BadRequestException();
    }
    if (found.userId !== userId) {
      throw new UnauthorizedException();
    }
    await this.userFavoriteRepository.delete(id);
  }
}
