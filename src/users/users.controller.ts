import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { Cookies } from 'src/cookies.decorator';
import { instanceToPlain } from 'class-transformer';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Cookies('jwt') cookie: string,
  ): Promise<any> {
    const user = instanceToPlain(await this.usersService.findOne(id));
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user = instanceToPlain(await this.usersService.create(createUserDto));
    return user;
  }
}
