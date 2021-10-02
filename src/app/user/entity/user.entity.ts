import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({ name: 'user' })
@Index('email_phone_index', ['email', 'phoneNumber'], { unique: true }) // creating index
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

  @OneToOne(() => RoleEntity, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  }) // entity relationships between user and role entity
  @JoinColumn()
  role: RoleEntity;
}
