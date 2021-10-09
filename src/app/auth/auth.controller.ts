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
@Controller(`api/auth`)
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  @UsePipes(new ValidationPipe(userSchema))
  async register(
    @Req() request: Request,
    @Res() response: Response,
    @Body() userDto: RegisterDto,
  ): Promise<Response<UserEntity, any>> {
    response.status(HttpStatus.CREATED);
    return response.json(this.authService.register(userDto));
  }

  @Post('/login')
  async login(@Body() payload: LoginDto): Promise<any> {
    return this.authService.login(payload);
  }
}
