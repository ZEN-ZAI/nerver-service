import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.model';

export class UserCreateAddressDto {
  @ApiProperty()
  user_id: string;
  @ApiProperty()
  address: CreateAddressDto;
}
