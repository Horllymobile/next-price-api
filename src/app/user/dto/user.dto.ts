import { RoleEntity } from '../entity/role.entity';
import { Role } from '../../../core/models/enums/Role';

export class UserDto {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  isActive: boolean;
  role?: RoleEntity;
  //   permission: Permission;
}

// enum Permission {
//   READ,
//   WRITE,
// }
