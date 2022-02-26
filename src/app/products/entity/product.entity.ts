import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { ProductComment } from 'src/app/products/entity/comment.entity';
import { UOM } from 'src/core/enums/unit-of-measurement';

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
  uom: UOM;

  @Column({ length: 256 })
  company: string;

  // @Column({ unique: true, length: 256 })
  // phoneNumber: string;

  @Column({ length: 512 })
  description: string;

  @CreateDateColumn({ default: new Date() })
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => ProductComment, (comment) => comment)
  @JoinColumn()
  comments: ProductComment[];
}
