import { UserDto } from './dto/user.dto';
import { ValidationPipe } from './../../core/shared/pipes/validation.pipe.pipe';
import { Role } from './enums/Role';
import {
  Body,
  Delete,
  HttpStatus,
  ParseIntPipe,
  Post,
  Put,
  Req,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import { Roles } from 'src/core/shared/decorator/role.decorator';
import { RolesGuard } from '../auth/guard/role.guard';
import * as Joi from 'joi';
import { UpdateValidationPipe } from 'src/core/shared/pipes/updatevalidation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.string().required().min(11).max(14),
});
@Controller('api/v1/users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @UseGuards(RolesGuard)
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

  @Get('/:userId')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['super_admin', 'admin', 'user'])
  findUserById(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findUserById(userId);
  }

  @Put('/:userId')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['super_admin', 'admin', 'user'])
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(new UpdateValidationPipe(userSchema)) user: UserDto,
  ) {
    return this.userService.updateUser(userId, user);
  }

  @Post('/image/:userId')
  uploadProfileImage(
    @Param('userId') userId: number,
    @Body() image: { url: string },
  ) {
    return this.userService.uploadProfileImage(userId, image.url);
  }

  @Delete('/:userId')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['super_admin'])
  deleteUser(@Param('userId') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
