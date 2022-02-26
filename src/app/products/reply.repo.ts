import { EntityRepository, Repository } from 'typeorm';
import { ReplyComment } from './entity/reply.entity';

@EntityRepository(ReplyComment)
export class ReplyRepository extends Repository<ReplyComment> {}
