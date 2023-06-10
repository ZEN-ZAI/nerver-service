import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHasAddressService } from './user_has_address.service';
import { UserHasAddressEntity } from './entity/user_has_address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserHasAddressEntity])],
  providers: [UserHasAddressService],
  exports: [UserHasAddressService],
})
export class UserHasAddressModule {}