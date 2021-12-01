import { UserService } from './../../user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtContant } from './../constants/jwtConstant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtContant.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findUserById(payload._id);
    if (!user) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    return {
      userId: payload._id,
      username: payload.username,
      roles: payload.roles.role,
      permission: payload.roles.permission,
    };
  }
}
