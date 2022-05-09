import { createParamDecorator, ExecutionContext, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

export const JwtUserId = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.cookies?.['jwt'];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded['userId'];
  },
);
