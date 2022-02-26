import { UserEntity } from './user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../../core/enums/Role';
import { Permission } from '../../../core/enums/Permission';
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

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @OneToOne(() => UserEntity, (user) => user.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  userId: number;
}
