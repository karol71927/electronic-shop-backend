import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import * as jwt from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { SECRET } from '../config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      // const decoded: any = jwt.verify(token, SECRET);
      //const user = await this.userService.findById(decoded.id);
      //  if(!user) {
      //    throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      //  }

      //  req.user = user.user;
      //  next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
