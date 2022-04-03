import { Product } from 'src/products/products.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class ProductOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @JoinColumn({
    name: 'user_id',
  })
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @JoinColumn({
    name: 'product_id',
  })
  @ManyToOne(() => Product, (product) => product.productOrders)
  product: Product;

  @Column()
  date: Date;
}
