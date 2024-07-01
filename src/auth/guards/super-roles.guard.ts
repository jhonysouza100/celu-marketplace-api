import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/roles.enum';

// Este guard autoriza el usuario recibido atravez del decorador @Roles('etc'), dependiendo si el rol coinside con el rol del usuario
@Injectable()
export class SuperRolesGuard implements CanActivate {

  constructor(private refelctor: Reflector) {}

  canActivate(context: ExecutionContext): boolean  {

    const roles = this.refelctor.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    // Obtiene el objeto user del middleware Authguard extraido desde el jwt access_token
    const { user } = context.switchToHttp().getRequest();

    if(user.role === Role.ROOT) return true; // Si el usuario es un super admin en adelante, tiene acceso permitido

    return roles === user.SUPER;

  }
}
