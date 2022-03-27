import { Product } from 'src/products/products.entity';
import { User } from 'src/users/users.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Cart {
  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @ManyToOne(() => Product, (product) => product.carts)
  product: Product;

  @Column()
  amount: number;
}