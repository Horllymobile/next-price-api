import { EntityRepository, Repository } from 'typeorm';
import { ProductComment } from './entity/comment.entity';

@EntityRepository(ProductComment)
export class CommentRepository extends Repository<ProductComment> {}
