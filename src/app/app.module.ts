import { RoleEntity } from './user/entity/role.entity';
import { UserEntity } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'next_price_database',
      logger: 'simple-console',
      logging: true,
      entities: [
        //join(__dirname + '**/**/entity/*.js'),
        UserEntity,
        RoleEntity,
      ],
      synchronize: true,
      // migrationsRun: true,
      // migrations: [join(__dirname + './migrations/*.js')],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
