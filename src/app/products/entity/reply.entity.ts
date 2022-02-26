import { UserEntity } from './../../user/entity/user.entity';
import { ProductEntity } from 'src/app/products/entity/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductComment } from './comment.entity';

@Entity()
export class ReplyComment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => ProductComment, { cascade: true, eager: true })
  comments: ProductComment;
}
