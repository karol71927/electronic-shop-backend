import { Product } from 'src/products/products.entity';
import { User } from 'src/users/users.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserFavorite {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({
    name: 'user_id',
  })
  @ManyToOne(() => User, (user) => user.userFavorites)
  user: User;

  @JoinColumn({
    name: 'product_id',
  })
  @ManyToOne(() => Product, (product) => product.userFavorites)
  product: Product;
}
