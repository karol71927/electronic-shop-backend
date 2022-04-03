import { Cart } from 'src/carts/carts.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ProductOrder } from 'src/product-order/product-order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const salt: string = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  @Column()
  email: string;

  @Column()
  type: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.user)
  productOrders: ProductOrder[];
}
