import { Cart } from 'src/carts/carts.entity';
import { ProductOrder } from 'src/product-order/product-order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  type: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.user)
  productOrders: ProductOrder[];
}
