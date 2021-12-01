import { ImageEntity } from './user/entity/image.entity';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { RoleEntity } from './user/entity/role.entity';
import { UserEntity } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
