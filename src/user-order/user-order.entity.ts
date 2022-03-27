import { ProductOrder } from 'src/product-order/product-order.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class UserOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.userOrders)
  user: User;

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.userOrder)
  productOrders: ProductOrder[];
}
