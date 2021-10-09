import { AuthMiddleware } from './middleware/auth.middleware';
import { UserService } from './../user/user.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../user/entity/role.entity';
import { UserEntity } from '../user/entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtContant } from './constants/jwtConstant';
import { JwtStrategy } from './strategy/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/role.guard';
@Module({
  imports: [
    JwtModule.register({
      secret: JwtContant.secret,
      signOptions: {
        expiresIn: JwtContant.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api/user');
  }
}
