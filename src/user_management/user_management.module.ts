import { Module } from '@nestjs/common';
import { UserModule } from '../persistence/user/user.module';
import { UserManagementService } from './user_management.service';
import { ProfileModule } from '../persistence/profile/profile.module';
import { AddressModule } from '../persistence/address/address.module';
import { UserHasAddressModule } from '../persistence/user_has_address/user_has_address.module';

@Module({
  imports: [UserManagementModule, UserModule, ProfileModule, AddressModule, UserHasAddressModule],
  providers: [UserManagementService],
  exports: [UserManagementService]
})
export class UserManagementModule { }
