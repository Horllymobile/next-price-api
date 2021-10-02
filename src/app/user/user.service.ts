import { UserPaginationDto } from './dto/user.pagination.dto';
import { Injectable } from '@nestjs/common';
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

  async findUsers(page: number, size: number): Promise<UserPaginationDto> {
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
      page,
      size,
      total,
      user,
    };
    return userPagination;
  }

  findUserById(userId: string): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }
  updateUser(userId: string, user: UserDto): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }
  deleteUser(userId: string): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }
}
