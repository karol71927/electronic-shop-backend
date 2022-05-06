export class GetCartDto {
  id: number;
  userId: number;
  productId: number;
  cartAmount: number;
  name: string;
  price: number;
  description: string;
  amount: number;
  availability: number;
  imageUrl: string;
  bestseller: boolean;
  categoryId: number;
  totalPrice: number;

  static convertRawToDto(raw: any): GetCartDto {
    const dto: GetCartDto = {
      id: raw.c_id,
      userId: raw.c_user_id,
      productId: raw.c_product_id,
      cartAmount: raw.c_amount,
      name: raw.p_name,
      price: raw.p_price,
      description: raw.p_description,
      amount: raw.p_amount,
      availability: raw.p_availability,
      imageUrl: raw.p_image_url,
      bestseller: raw.p_bestseller,
      categoryId: raw.p_category_id,
      totalPrice: raw.p_price * raw.c_amount,
    };
    return dto;
  }
}

export class GetCartWithTotalPriceDto {
  totalPrice: number;
  items: GetCartDto[];
}
