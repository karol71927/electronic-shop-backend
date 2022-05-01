import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  category: string;
  @ApiProperty()
  availability: boolean;
  @ApiProperty()
  imageUrl: string;
  @ApiPropertyOptional()
  bestseller: boolean;
}
