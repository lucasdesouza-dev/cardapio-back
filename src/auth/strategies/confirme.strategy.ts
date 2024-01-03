import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ExtractJwt } from 'passport-jwt';
import { UserPayload } from '../models/UserPayload';
import { UserFromJwt } from '../models/UserFromJwt';

@Injectable()
export class ConfirmeStrategy extends PassportStrategy(Strategy, 'confirme') {
  static key = "confirme"

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_CONFIRME_EMAIL,
    });
  }

  async validate(payload: UserPayload): Promise<UserFromJwt> {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      confirmEmail: payload.confirmEmail,
      tenantUuid: payload.tenantUuid

    };
  }
}