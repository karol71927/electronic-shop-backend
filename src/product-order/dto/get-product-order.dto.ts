export class GetProductOrderDto {
  id: number;
  productId: number;
  orderDate: Date;
  productName: string;
  productPrice: number;
  productAmount: number;
  productImageUrl: string;
  totalPrice: number;

  static convertRawToDto(raw: any): GetProductOrderDto {
    const dto: GetProductOrderDto = {
      id: raw.po_id,
      productId: raw.po_product_id,
      orderDate: raw.po_date,
      productName: raw.p_name,
      productPrice: raw.p_price,
      productAmount: raw.p_amount,
      productImageUrl: raw.p_image_url,
      totalPrice: raw.p_amount * raw.p_price,
    };
    return dto;
  }
}
