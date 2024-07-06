import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const bearerToken = request.headers['authorization'];

    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = bearerToken.split(' ')[1];
    const decoded = jwt.decode(token);
    request.user = decoded;
    console.log(decoded);
    console.log(request.user);
    const user = request.user;
    return this.matchRoles(roles, user.role);
  }
}
