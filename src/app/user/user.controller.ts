import { HttpStatus, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async findUsers(
    @Query(
      'page',
      // new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    page: number,
    @Query(
      'size',
      // new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    size: number,
  ) {
    return await this.userService.findUsers(page, size);
  }
}
