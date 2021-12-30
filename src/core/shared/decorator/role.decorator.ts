import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/core/models/enums/Role';
import { Permission } from 'src/core/models/enums/Permission';

interface RolePermision {
  role: Role;
  permission: Permission;
}

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
