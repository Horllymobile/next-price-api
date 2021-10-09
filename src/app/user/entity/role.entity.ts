import { UserEntity } from './user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/Role';
import { Permission } from '../enums/Permission';

@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: Role.USER })
  role: Role;

  @Column({ default: Permission.READONLY })
  permission: Permission;

  @OneToOne(() => UserEntity, (user) => user.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  userId: number;
}
