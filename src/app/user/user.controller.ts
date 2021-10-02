import { UserService } from './user.service';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async findUsers(@Query('page') page, @Query('size') size: number) {
    return await this.userService.findUsers(page, size);
  }
}
