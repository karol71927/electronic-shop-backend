import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.jwt;
    if (!token) {
      return false;
    }
    const decoded = jwt.verify(
      token.access_token,
      this.configService.get('JWT_SECRET'),
    );
    if ((<any>decoded).exp < new Date().getTime()) {
      return false;
    }
    return requiredRoles.some((role) => (<any>decoded).userRole.includes(role));
  }
}
