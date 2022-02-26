import { UserEntity } from '../../user/entity/user.entity';
import { ProductEntity } from 'src/app/products/entity/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReplyComment } from './reply.entity';

@Entity()
export class ProductComment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  comment: string;

  @CreateDateColumn({ default: new Date() })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => ProductEntity, (product) => product.comments)
  @JoinColumn()
  product_id: number;

  @ManyToOne((type) => UserEntity, (reply) => reply.comments)
  @JoinColumn()
  user_id: number;

  // @OneToMany((type) => ReplyComment, (reply) => reply)
  // replies: ReplyComment[];
}
