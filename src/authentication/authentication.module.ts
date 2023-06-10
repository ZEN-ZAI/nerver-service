import { Module } from '@nestjs/common';
import { UserModule } from '../persistence/user/user.module';
import { AuthenticationService } from './authentication.service';
import { TokenModule } from '../persistence/token/token.module';
import { ProfileModule } from '../persistence/profile/profile.module';

@Module({
  imports: [AuthenticationModule, UserModule, ProfileModule, TokenModule],
  providers: [AuthenticationService],
  exports: [AuthenticationService]
})
export class AuthenticationModule { }
