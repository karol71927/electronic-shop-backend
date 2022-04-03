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
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({
    name: 'user_id',
  })
  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @JoinColumn({
    name: 'product_id',
  })
  @ManyToOne(() => Product, (product) => product.carts)
  product: Product;

  @Column()
  amount: number;
}
