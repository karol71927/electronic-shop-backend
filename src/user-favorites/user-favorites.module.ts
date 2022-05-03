import { Module } from '@nestjs/common';
import { UserFavoritesService } from './user-favorites.service';
import { UserFavoritesController } from './user-favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavorite } from './user-favorites.entity';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserFavorite]),
    ProductsModule,
    UsersModule,
  ],
  providers: [UserFavoritesService],
  controllers: [UserFavoritesController],
})
export class UserFavoritesModule {}
