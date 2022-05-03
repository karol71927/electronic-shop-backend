export class GetUserFavoriteDto {
  id: number;
  userId: number;
  productId: number;
  name: string;
  price: number;
  description: string;
  amount: number;
  availability: number;
  imageUrl: string;
  bestseller: boolean;
  categoryId: number;

  static convertRawToDto(raw: any): GetUserFavoriteDto {
    const dto: GetUserFavoriteDto = {
      id: raw.uf_id,
      userId: raw.uf_user_id,
      productId: raw.uf_product_id,
      name: raw.p_name,
      price: raw.p_price,
      description: raw.p_description,
      amount: raw.p_amount,
      availability: raw.p_availability,
      imageUrl: raw.p_image_url,
      bestseller: raw.p_bestseller,
      categoryId: raw.p_category_id,
    };
    return dto;
  }
}
