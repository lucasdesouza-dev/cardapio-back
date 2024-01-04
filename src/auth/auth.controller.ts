
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Request } from '@nestjs/common';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { LoginRequestBody } from './models/LoginRequestBody';
import { UserRefreshToken } from './models/UserRefreshToken';
import { UserLoginSemSenhaToken } from './models/UserLoginSemSenhaToken';
import { AuthGuard } from '@nestjs/passport';
import { LoginSemSenhaStrategy } from './strategies/loginsemsenha.strategy';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @ApiTags('auth')
  @ApiBody({
    type: LoginRequestBody,
    // description: 'Reason Code',
    required: true,
    isArray: false,
  })
  @IsPublic()
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
  @ApiBody({
    type: UserRefreshToken,
    // description: 'Reason Code',
    required: true,
    isArray: false,
  })
  @ApiTags('auth')
  @ApiBearerAuth('JWT-auth')
  @Post('auth/refresh')
  async reautenticar(@Body() body) {
    return this.authService.reautenticar(body); //este método será implementado abaixo, portanto é esperado que de erro.
  }
  @IsPublic()
  @ApiTags('auth')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard(LoginSemSenhaStrategy.key))

  @Get('auth/loginsemsenhatoken')
  async LoginSemSenha(@CurrentUser() user: User) {
    return this.authService.loginSemSenha(user); //este método será implementado abaixo, portanto é esperado que de erro.
  }
}


