import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../../common/enums/roles.enum";
import { ROLES_KEY, Roles } from "./roles.decorator";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";

export function Auth(role: Role) {
  return applyDecorators(
    Roles(role),
    UseGuards(AuthGuard, RolesGuard),
  );
}