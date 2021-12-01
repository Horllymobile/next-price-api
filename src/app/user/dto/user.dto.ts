import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from '../entity/role.entity';
import { Role } from './../enums/Role';

export class UserDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phoneNumber?: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
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
