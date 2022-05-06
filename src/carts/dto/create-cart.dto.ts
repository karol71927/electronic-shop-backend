import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty({
    required: false,
  })
  userId: number;
  @ApiProperty()
  productId: number;
  @ApiProperty()
  amount: number;
}
