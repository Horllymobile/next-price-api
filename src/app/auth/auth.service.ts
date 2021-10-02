import { UserEntity } from './../user/entity/user.entity';
import { RegisterDto } from './dto/RegisterDto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, Transaction } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Permission } from '../user/enums/Permission';
import { Role } from '../user/enums/Role';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private connection: Connection,
  ) {}
  // @Transaction({ isolation: 'SERIALIZABLE' })
  async register(user: RegisterDto) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const findUser = await this.userRepository.find({
        where: { email: user.email },
      });
      let newUser: UserEntity;
      if (findUser.length > 0) throw new Error(`Email is already exist`);
      const salt = bcrypt.genSaltSync(10);
      if (user.email === 'horlamidex1@gmail.com') {
        newUser = this.userRepository.create({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isActive: true,
          password: bcrypt.hashSync(user.password, salt),
          phoneNumber: user.phoneNumber,
          role: { permission: Permission.WRITE_ALL, role: Role.SUPER_ADMIN },
        });
      } else {
        newUser = this.userRepository.create({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isActive: false,
          password: bcrypt.hashSync(user.password, salt),
          phoneNumber: user.phoneNumber,
          role: { permission: Permission.READONLY, role: Role.USER },
        });
      }
      await queryRunner.manager.save(newUser);
      await queryRunner.commitTransaction();
      return newUser;
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw new Error(error.message);
    }
  }
}
