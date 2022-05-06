import { IsNotEmpty } from 'class-validator';

export class CreateUserFavoriteDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  productId: number;
}
