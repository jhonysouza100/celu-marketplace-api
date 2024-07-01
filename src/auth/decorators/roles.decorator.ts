import { SetMetadata } from "@nestjs/common";
import { Role } from "../../common/enums/roles.enum";

export const ROLES_KEY = 'roles'
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);