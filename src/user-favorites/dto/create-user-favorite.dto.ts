import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserFavoriteDto {
  @IsOptional()
  userId: number;

  @IsNotEmpty()
  productId: number;
}
