import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { instanceToPlain } from 'class-transformer';
import { JwtUserId } from 'src/jwt-user-id.decorator';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@ApiCookieAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(Role.User, Role.Admin)
  async findOne(@JwtUserId() id: number): Promise<any> {
    const user = instanceToPlain(await this.usersService.findOne(id));
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user = instanceToPlain(await this.usersService.create(createUserDto));
    return user;
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @JwtUserId() userId: number,
  ) {
    return this.usersService.changePassword(changePasswordDto, userId);
  }
}
