// import { ImageEntity } from './user/entity/image.entity';
// import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { RoleEntity } from './user/entity/role.entity';
import { UserEntity } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { ProductEntity } from './products/entity/product.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'horlly442',
      database: 'nextprice',
      logger: 'file',
      logging: true,
      synchronize: true,
      autoLoadEntities: true,
    }),
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
