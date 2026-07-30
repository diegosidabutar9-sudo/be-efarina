import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true; // if no role is required, access is granted
    }
    
    const { user } = context.switchToHttp().getRequest();
    
    if (!user || !user.role) {
      return false; // user object is not attached (maybe JwtGuard failed or not present)
    }

    return requiredRoles.includes(user.role);
  }
}
