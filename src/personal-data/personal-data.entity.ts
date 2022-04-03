import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class PersonalData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({
    name: 'zip_code',
  })
  zipCode: string;

  @Column()
  phone: string;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'id',
  })
  user: User;
}
