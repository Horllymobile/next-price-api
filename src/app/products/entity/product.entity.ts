import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'product' })
// @Index()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  price: number;

  @Column({ length: 256, nullable: false })
  uom: string;

  @Column({ length: 256 })
  company: string;

  @Column({ default: false })
  approved: boolean;

  @Column({ length: 512 })
  description: string;

  @CreateDateColumn({ nullable: false })
  createAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;
}
