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
      Date.now() +
        parseInt(this.configService.get('JWT_EXPIRATION_TIME')) * 1000,
    );
    console.log(expire);
    const jwt = await this.authService.login(body);
    // response.setHeader(
    //   'Set-Cookie',
    //   `${jwt}; HttpOnly; Path=/; Max-Age=${this.configService.get(
    //     'JWT_EXPIRATION_TIME',
    //   )}; Secure; SameSite=None`,
    // );
    response.cookie('jwt', jwt.jwt, {
      httpOnly: false,
      expires: expire,
      secure: false,
      sameSite: 'lax',
    });
    response.send(jwt.payload);
  }
}
