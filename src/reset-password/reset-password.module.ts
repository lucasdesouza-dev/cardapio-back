import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    MailModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_RESET_SENHA,
      signOptions: { expiresIn: process.env.RESET_SENHA_TOKEN_DURATION },
    }),
  ],
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
})
export class ResetPasswordModule { }
