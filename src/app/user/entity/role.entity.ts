import { UserEntity } from './user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/Role';
import { Permission } from '../enums/Permission';
import { on } from 'events';

@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: Role, default: Role.USER })
  role: Role;

  @Column({ enum: Permission, default: Permission.READONLY })
  permission: Permission;

  @OneToOne(() => UserEntity, (user) => user.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  userId: number;
}
