import { Cart } from 'src/carts/carts.entity';
import { UserOrder } from 'src/user-order/user-order.entity';
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

  @OneToMany(() => UserOrder, (userOrder) => userOrder.user)
  userOrders: UserOrder[];
}
