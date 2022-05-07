import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
  Logger,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Response } from 'express';
import { LoginUserDto } from './loginUser.dto';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const expire = new Date(
      Date.now() + parseInt(this.configService.get('JWT_EXPIRATION_TIME')),
    );
    console.log(expire);
    response.cookie('jwt', await this.authService.login(body), {
      httpOnly: true,
      //maxAge: parseInt(this.configService.get('JWT_EXPIRATION_TIME')),
      expires: expire,
    });
  }
}
