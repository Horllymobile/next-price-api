import { AuthService } from './auth.service';
import { RegisterDto } from './dto/RegisterDto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  async register(@Body() userDto: RegisterDto) {
    return this.authService.register(userDto);
  }
}
