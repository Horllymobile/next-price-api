import { SetMetadata } from '@nestjs/common';
import { Role } from './../../../app/user/enums/Role';
import { Permission } from './../../../app/user/enums/Permission';

interface RolePermision {
  role: Role;
  permission: Permission;
}

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
