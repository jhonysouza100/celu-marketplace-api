import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/roles.enum';

// Este guard autoriza el usuario recibido atravez del decorador @Roles('etc'), dependiendo si el rol coinside con el rol del usuario
@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private refelctor: Reflector) {}

  canActivate(context: ExecutionContext): boolean  {

    const roles = this.refelctor.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    // Si no se especifica el requerimiento de un rol. Autoriza la entrada
    if(!roles) return true;

    // Obtiene el objeto user del middleware Authguard extraido desde el jwt access_token
    const { user } = context.switchToHttp().getRequest();

    return roles === user.role;

  }
}
