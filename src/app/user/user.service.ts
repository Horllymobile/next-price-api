import { UserPaginationDto } from './dto/user.pagination.dto';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import { IUserService } from './interface/iuser-service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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
        'role',
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

  async findUserById(userId: number): Promise<UserDto> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new Error(`user with id of ${userId} does not exist`);
    return user;
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user)
      throw new HttpException(
        `email ${email} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    return user;
  }
  updateUser(userId: number, user: UserDto): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }
  deleteUser(userId: number): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }
}
