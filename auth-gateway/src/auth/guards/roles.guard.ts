import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { ROLES_KEY } from '../decorators/Roles.decorator';
import { Role } from '../roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(requiredRoles);
    if (!requiredRoles) {
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
    const user = request.user;
    return this.matchRoles(requiredRoles, user.role);
  }
}
