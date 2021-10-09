import { RoleEntity } from '../entity/role.entity';
import { Role } from './../enums/Role';

export class UserDto {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  isActive: boolean;
  roles?: RoleEntity;
  //   permission: Permission;
}

export class UpdateUserDto {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

// enum Permission {
//   READ,
//   WRITE,
// }
