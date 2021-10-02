import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/Role';
import { Permission } from '../enums/Permission';

@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: Role, default: Role.USER })
  role: Role;

  @Column({ enum: Permission, default: Permission.READONLY })
  permission: Permission;
}
