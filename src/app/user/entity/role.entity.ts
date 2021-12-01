import { UserEntity } from './user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/Role';
import { Permission } from '../enums/Permission';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'role' })
export class RoleEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ enum: ['SUPER_ADMIN', 'ADMIN', 'USER'] })
  @Column({ default: Role.USER })
  role: Role;

  @ApiProperty({ enum: ['WRITE', 'EDIT', 'READ'] })
  @Column({ default: Permission.READONLY })
  permission: Permission;

  @ApiProperty()
  @OneToOne(() => UserEntity, (user) => user.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  userId: number;
}
