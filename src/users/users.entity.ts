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
import { Exclude } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';
import { UserFavorite } from 'src/user-favorites/user-favorites.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  login: string;

  @Column({
    nullable: false,
  })
  @Exclude()
  @MinLength(8)
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const salt: string = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  @Column({
    nullable: false,
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({
    nullable: false,
  })
  type: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.user)
  productOrders: ProductOrder[];

  @OneToMany(() => UserFavorite, (userFavorite) => userFavorite.user)
  userFavorites: UserFavorite[];
}
