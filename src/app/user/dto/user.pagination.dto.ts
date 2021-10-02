import { UserDto } from './user.dto';

export class UserPaginationDto {
  page: number;
  size: number;
  total: number;
  user: UserDto[];
}
