import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enums/Role';
import { RoleEntity } from './role.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column()
  lastName: string;
  @Column({ unique: true })
  email: string;

  @Column({ length: 256 })
  password: string;

  @Column({ unique: true, length: 11 })
  phoneNumber: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @CreateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @OneToOne(() => RoleEntity, { eager: true, cascade: true, nullable: false })
  @JoinColumn()
  role: RoleEntity;
}
