import { Cart } from 'src/carts/carts.entity';
import { UserOrder } from 'src/user-order/user-order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  @OneToMany(() => UserOrder, (userOrder) => userOrder.user)
  userOrders: UserOrder[];
}
