import { UserService } from './../user/user.service';
import { LoginDto } from './dto/LoginDto';
import { UserEntity } from './../user/entity/user.entity';
import { RegisterDto } from './dto/RegisterDto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Permission } from '../user/enums/Permission';
import { Role } from '../user/enums/Role';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private connection: Connection,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(payload: LoginDto) {
    const user = await this.userService.findByEmail(payload.email);
    const isValid = await bcrypt.compare(payload.password, user.password);
    if (!isValid)
      throw new HttpException(
        'Password does not match',
        HttpStatus.UNAUTHORIZED,
      );
    if (!user.isActive)
      throw new HttpException(
        'Email is not yet verified please check your mail to verify',
        HttpStatus.UNAUTHORIZED,
      );
    if (!payload.remember) {
      const accessToken = this.jwtService.sign({
        _id: user.id,
        username: user.email,
        active: user.isActive,
        roles: user.roles,
      });
      return { accessToken };
    }
    const accessToken = this.jwtService.sign(
      {
        _id: user.id,
        username: user.email,
        active: user.isActive,
        roles: user.roles,
      },
      { expiresIn: '60' },
    );
    const refreshToken = this.jwtService.sign({
      _id: user.id,
      email: user.email,
    });
    return { accessToken, refreshToken };
  }

  // @Transaction({ isolation: 'SERIALIZABLE' })
  async register(user: RegisterDto) {
    const queryRunner = this.connection.createQueryRunner(); //

    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const findUser = await this.userRepository.find({
        where: { email: user.email },
      });
      let newUser: UserEntity;
      if (findUser.length > 0)
        throw new HttpException('email already exist', HttpStatus.BAD_REQUEST);
      const salt = bcrypt.genSaltSync(10);
      if (user.email === 'horlamidex1@gmail.com') {
        newUser = this.userRepository.create({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isActive: true,
          password: bcrypt.hashSync(user.password, salt),
          phoneNumber: user.phoneNumber,
          roles: { permission: Permission.WRITE_ALL, role: Role.SUPER_ADMIN },
        });
      } else if (user.email === 'kogiboi12@gmail.com') {
        newUser = this.userRepository.create({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isActive: true,
          password: bcrypt.hashSync(user.password, salt),
          phoneNumber: user.phoneNumber,
          roles: { permission: Permission.READONLY, role: Role.USER },
        });
      } else if (user.email === 'horlamidex1@outlook.com') {
        newUser = this.userRepository.create({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isActive: true,
          password: bcrypt.hashSync(user.password, salt),
          phoneNumber: user.phoneNumber,
          roles: { permission: Permission.WRITE_EDIT, role: Role.ADMIN },
        });
      } else {
        newUser = this.userRepository.create({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isActive: false,
          password: bcrypt.hashSync(user.password, salt),
          phoneNumber: user.phoneNumber,
          roles: { permission: Permission.READONLY, role: Role.USER },
        });
      }
      const save = await queryRunner.manager.save(newUser);
      if (save) {
        await queryRunner.commitTransaction();
        return save;
      }
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // async getCurrentUser(userId: number) {

  // }
}
