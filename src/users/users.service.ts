import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
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

  async findOne(username: string): Promise<User> {
    return this.users.find((user) => (user.username = username));
  }
}
