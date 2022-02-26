import { ImageEntity } from './entity/image.entity';
import { UserPaginationDto } from './dto/user.pagination.dto';
import {
  HttpException,
  Injectable,
  HttpStatus,
  HttpCode,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { UserDto, UpdateUserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import { IUserService } from './interface/iuser-service.interface';
import { UserRepository } from './repository/user.repo';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    private connection: Connection,
  ) {}

  async findUsers(
    page: number,
    size: number,
  ): Promise<UserPaginationDto | HttpException> {
    const total = await (await this.userRepository.find()).length;
    const user = await this.userRepository.find({
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'isActive',
        'phoneNumber',
        'createdAt',
        'updatedAt',
        'image',
        'roles',
      ],
      skip: page,
      take: size,
    });
    const userPagination: UserPaginationDto = {
      page: page ? page : 0,
      size: size ? size : 20,
      total,
      user,
    };
    return userPagination;
  }

  async findUserById(id: number): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne(id, {
        select: [
          'id',
          'firstName',
          'lastName',
          'email',
          'isActive',
          'phoneNumber',
          'createdAt',
          'roles',
        ],
      });
      if (!user)
        throw new HttpException(
          `user with id of ${id} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne(
        { email },
        {
          select: [
            'id',
            'firstName',
            'lastName',
            'email',
            'isActive',
            'phoneNumber',
            'createdAt',
            'roles',
          ],
        },
      );
      if (!user)
        throw new HttpException(
          `email ${email} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      return user;
    } catch (error) {
      throw new HttpException(`Something went wrong`, HttpStatus.NOT_FOUND);
    }
  }

  async uploadProfileImage(userId: number, image: string): Promise<any> {
    const user = await this.userRepository.findOne(userId);
    console.log(image);
    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    user.image = image;
    await this.userRepository.save(user);
    return { message: 'image successfully uploaded' };
  }
  async updateUser(userId: number, payload: UpdateUserDto): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction('SERIALIZABLE');
      let user = await this.userRepository.findOne(userId);
      if (!user) {
        throw new HttpException(
          `user with id ${userId} not found`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        user = await this.findByEmail(user.email);
        if (user && user.id !== userId) {
          await queryRunner.rollbackTransaction();
          throw new HttpException(
            `user with email already exist`,
            HttpStatus.BAD_REQUEST,
          );
        }
        user = await this.userRepository.findOne({
          phoneNumber: payload.phoneNumber,
        });
        if (user && user.id !== userId) {
          await queryRunner.rollbackTransaction();
          throw new HttpException(
            `phone number already taken`,
            HttpStatus.BAD_REQUEST,
          );
        }
        await queryRunner.commitTransaction();
        await this.userRepository.update(userId, {
          firstName: payload.firstName,
          lastName: payload.lastName,
          phoneNumber: payload.phoneNumber,
        });
        return { message: 'User update successfully' };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async deleteUser(userId: number): Promise<any> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return await this.userRepository.delete(userId);
  }
}
