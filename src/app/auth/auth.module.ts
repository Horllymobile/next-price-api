import { UserService } from './../user/user.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../user/entity/role.entity';
import { UserEntity } from '../user/entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
@Module({
  imports: [
    JwtModule.register({
      secret: 'God is the greatest being',
    }),
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
