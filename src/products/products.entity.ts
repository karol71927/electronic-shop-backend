import { Cart } from 'src/carts/carts.entity';
import { Category } from 'src/categories/categories.entity';
import { ProductOrder } from 'src/product-order/product-order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  availability: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.product)
  productOrders: ProductOrder[];
}