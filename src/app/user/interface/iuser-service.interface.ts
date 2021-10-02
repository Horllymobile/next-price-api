import { UserPaginationDto } from './../dto/user.pagination.dto';
import { UserDto } from './../dto/user.dto';
import { HttpException } from '@nestjs/common';
export interface IUserService {
  findUsers(
    page: number,
    size: number,
  ): Promise<UserPaginationDto | HttpException>;
  findUserById(userId: number): Promise<UserDto>;
  updateUser(userId: number, user: UserDto): Promise<UserDto>;
  deleteUser(userId: number): Promise<UserDto>;
}
