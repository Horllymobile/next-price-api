import { Role } from './enums/Role';
import {
  HttpStatus,
  ParseIntPipe,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import { Roles } from 'src/core/shared/decorator/role.decorator';
import { RolesGuard } from '../auth/guard/role.guard';

@Controller('api/users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(RolesGuard)
  @Get('/')
  @SetMetadata('roles', ['super_admin', 'admin'])
  async findUsers(
    @Req() req,
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
    console.log(req.user);
    return await this.userService.findUsers(page, size);
  }
}
