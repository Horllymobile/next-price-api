import { UserRepository } from './../user/repository/user.repo';
import { CommentService } from './comment.service';
import { JwtModule } from '@nestjs/jwt';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../auth/middleware/auth.middleware';
import { ProductRepository } from './product.repo';
import { CommentRepository } from './comment.repo';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductRepository,
      CommentRepository,
      UserRepository,
    ]),
    AuthModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, CommentService],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProductsController);
  }
}
