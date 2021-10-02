import { UserPaginationDto } from './../dto/user.pagination.dto';
import { UserDto } from './../dto/user.dto';
export interface IUserService {
  findUsers(page: number, size: number): Promise<UserPaginationDto>;
  findUserById(userId: string): Promise<UserDto>;
  updateUser(userId: string, user: UserDto): Promise<UserDto>;
  deleteUser(userId: string): Promise<UserDto>;
}
