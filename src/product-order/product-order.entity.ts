import { Product } from 'src/products/products.entity';
import { UserOrder } from 'src/user-order/user-order.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class ProductOrder {
  @Column()
  amount: number;

  @ManyToOne(() => UserOrder, (userOrder) => userOrder.productOrders)
  userOrder: UserOrder;

  @ManyToOne(() => Product, (product) => product.productOrders)
  product: Product;
}
