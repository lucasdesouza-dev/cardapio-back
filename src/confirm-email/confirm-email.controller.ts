import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ConfirmEmailService } from './confirm-email.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ConfirmeGuard } from 'src/auth/guards/confirme-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { ConfirmeStrategy } from 'src/auth/strategies/confirme.strategy';

@ApiTags('confirm-email')

@IsPublic()
@UseGuards(AuthGuard(ConfirmeStrategy.key))

@Controller('confirm-email')
export class ConfirmEmailController {
  constructor(private readonly confirmEmailService: ConfirmEmailService) { }
  @ApiBearerAuth('JWT-auth')
  @Patch()
  update(@CurrentUser() user: User) {
    return this.confirmEmailService.update(user);
  }
}
