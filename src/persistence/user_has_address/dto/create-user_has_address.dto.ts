import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from '../../address/entity/address.entity';
import { UserEntity } from '../../user/entity/user.entity';

export class CreateUserHasAddressDto {
  @ApiProperty()
  user: UserEntity;
  @ApiProperty()
  address: AddressEntity;
}