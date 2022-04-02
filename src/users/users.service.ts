import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  private readonly users = [
    {
      id: 1,
      username: 'john',
      password: 'password',
      email: 'john@gmail.com',
    },
    {
      id: 2,
      username: 'diana',
      password: 'pswd',
      email: 'diana@gmail.com',
    },
  ];

  //curl -X POST http://localhost:3000/api/auth/login -d '{"username": "john", "password": "password", "email": "john@gmail.com"}' -H "Content-Type: application/json"

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.find({
      where: {
        login: username,
      },
    })[0];
  }
}
