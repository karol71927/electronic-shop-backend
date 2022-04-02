import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
<<<<<<< HEAD
import { UsersService } from './users.service';
import { User } from './users.entity';
=======
import { User } from './users.entity';
import { UsersService } from './users.service';
import { Cookies } from 'src/cookies.decorator';
>>>>>>> a7b5a2024f9f9a5bbdec99523672e46370a82a38

@ApiBearerAuth()
@Controller('users')
export class UsersController {
<<<<<<< HEAD
  constructor(private userService: UsersService) {}
=======
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Cookies('jwt') cookie: string,
  ): Promise<User> {
    console.log(cookie);
    return this.usersService.findOne(id);
  }
>>>>>>> a7b5a2024f9f9a5bbdec99523672e46370a82a38

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
