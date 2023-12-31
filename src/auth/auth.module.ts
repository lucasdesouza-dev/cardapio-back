import { UserModule } from './../user/user.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { MailModule } from 'src/mail/mail.module';
import { ConfirmeStrategy } from './strategies/confirme.strategy';
import { ResetSenhaStrategy } from './strategies/reset-senha.strategy';
import { LoginSemSenhaStrategy } from './strategies/loginsemsenha.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: `${process.env.TOKEN_DURATION}`,
      },
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, LoginSemSenhaStrategy, ResetSenhaStrategy, ConfirmeStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
