import { UserEntity } from './../user/entity/user.entity';
import { LoginDto } from './dto/LoginDto';
import { ValidationPipe } from './../../core/shared/pipes/validation.pipe.pipe';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/RegisterDto';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  HttpException,
  Res,
  Req,
  HttpStatus,
  Query,
} from '@nestjs/common';
import * as Joi from 'joi';
import { UserDto } from '../user/dto/user.dto';
import { Request, Response } from 'express';

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required().min(11).max(14),
  password: Joi.string().required().min(6).max(16),
});
@Controller(`api/v1/auth`)
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  @UsePipes(new ValidationPipe(userSchema))
  async register(
    @Req() request: Request,
    @Res() response: Response,
    @Body() userDto: RegisterDto,
  ): Promise<any> {
    this.authService
      .register(userDto)
      .then((res) =>
        response.status(HttpStatus.CREATED).json({ metaData: { ...res } }),
      )
      .catch((error) =>
        response
          .status(HttpStatus.BAD_REQUEST)
          .json({ metaData: { error: error.message } }),
      );
  }

  @Post('/login')
  async login(@Body() payload: LoginDto): Promise<any> {
    return this.authService.login(payload);
  }

  @Post('/confirm')
  async confirm(@Query('token') token: string) {
    return this.authService.confirm(token);
  }
}
