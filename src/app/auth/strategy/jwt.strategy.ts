import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtContant } from './../constants/jwtConstant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtContant.secret,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload._id,
      username: payload.username,
      roles: payload.roles.role,
      permission: payload.roles.permission,
    };
  }
}
