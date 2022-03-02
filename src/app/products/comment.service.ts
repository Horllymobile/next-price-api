import { UserRepository } from '../user/repository/user.repo';
import { ProductComment } from 'src/app/products/entity/comment.entity';
import { ProductRepository } from './product.repo';
import { CommentRepository } from './comment.repo';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCommentDto } from './dto/create-comment';
import { UpdateCommentDto } from './dto/update-comment';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,

    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(createCommentDto: AddCommentDto): Promise<ProductComment> {
    const product = await this.productRepository.findOne(
      createCommentDto.product_id,
    );

    if (!product) {
      throw new NotFoundException(
        `product with id ${createCommentDto.product_id} not found`,
      );
    }

    const user = await this.userRepository.findOne(createCommentDto.user_id);

    if (!user) {
      throw new NotFoundException(
        `user with id ${createCommentDto.user_id} not found`,
      );
    }

    const comment = this.commentRepository.create({
      comment: createCommentDto.comment,
      product_id: createCommentDto.product_id,
      user_id: createCommentDto.user_id,
    });

    await this.commentRepository.save(comment);
    return comment;
  }

  async findAll(
    id: number,
    page: number,
    size: number,
  ): Promise<{
    page: number;
    size: number;
    total: number;
    metaData: any[];
  }> {
    const comments = await this.commentRepository.find({
      skip: page ? page : 0,
      take: size ? size : 20,
      where: { product_id: id },
    });

    console.log(id);

    return { page, size, total: comments.length, metaData: comments };
  }

  async findComment(productId: number, commentId: number) {
    const comment = await this.commentRepository.findOne({
      where: { product_id: productId, id: commentId },
    });

    if (!comment) {
      throw new NotFoundException({
        message: `Comment with id ${commentId} not found`,
      });
    }
    return comment;
  }

  async updateComment(
    productId: number,
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<ProductComment> {
    const comment = await this.findComment(productId, commentId);
    comment.comment = updateCommentDto.comment;
    await this.commentRepository.save(comment);
    return comment;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
