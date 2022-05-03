import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Any, Repository } from 'typeorm';
import { CreateUserFavoriteDto } from './dto/create-user-favorite';
import { UserFavorite } from './user-favorites.entity';

@Injectable()
export class UserFavoritesService {
  constructor(
    @InjectRepository(UserFavorite)
    private readonly userFavoriteRepository: Repository<UserFavorite>,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  async findAllForUser(id: number): Promise<any> {
    const query = this.userFavoriteRepository
      .createQueryBuilder('uf')
      .innerJoinAndSelect('product', 'p', 'p.id = uf.product_id')
      .where('user_id = :userId', { userId: id });
    console.log(query.getSql());
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
    return this.userFavoriteRepository.save(userFavoriteEntity);
  }

  async deleteUserFavorite(id: number): Promise<void> {
    await this.userFavoriteRepository.delete(id);
  }
}
