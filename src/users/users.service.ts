import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.enum';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
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



  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.find({
      where: {
        login: username,
      },
    })[0];
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { login, email, password } = createUserDto;
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.login = :login', { login })
      .orWhere('user.email = :email', { email });
    // if (user) {
    //   throw new HttpException(
    //     { message: 'Username or email already exists' },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    console.log(user);
    const userEntity = new User();
    userEntity.login = login;
    userEntity.email = email;
    userEntity.password = password;
    userEntity.type = Role.User;

    return await this.usersRepository.save(userEntity);
  }
}
