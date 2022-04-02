import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { Cookies } from 'src/cookies.decorator';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Cookies('jwt') cookie: string,
  ): Promise<User> {
    console.log(cookie);
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
}
