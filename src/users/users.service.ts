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

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({
      login: username,
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { login, email, password } = createUserDto;
    if (
      (await this.findByEmail(createUserDto.email)) ||
      (await this.findByUsername(createUserDto.login))
    ) {
      throw new HttpException(
        { message: 'Username or email already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const userEntity = new User();
    userEntity.login = login;
    userEntity.email = email;
    userEntity.password = password;
    userEntity.type = Role.User;

    return await this.usersRepository.save(userEntity);
  }
}
