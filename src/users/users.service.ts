import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.enum';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

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
      throw new BadRequestException({
        message: 'Username or email already exists',
      });
    }
    const userEntity = new User();
    userEntity.login = login;
    userEntity.email = email;
    userEntity.password = password;
    userEntity.type = Role.User;

    return await this.usersRepository.save(userEntity).catch((err) => {
      throw new BadRequestException(err);
    });
  }

  async changePassword(changePasswordDto: ChangePasswordDto, userId: number) {
    let dbUser = await this.findOne(userId);
    const isMatch = await bcrypt.compare(
      changePasswordDto.password,
      dbUser.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Bad password');
    }
    dbUser.password = changePasswordDto.newPassword;
    return this.usersRepository.update(dbUser.id, dbUser).catch((err) => {
      throw new BadRequestException(err);
    });
  }
}
