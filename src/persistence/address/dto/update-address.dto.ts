import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @ApiProperty()
  receiver: string;
  @ApiProperty()
  building_number: string;
  @ApiProperty()
  street: string;
  @ApiProperty()
  subdistrict: string;
  @ApiProperty()
  district: string;
  @ApiProperty()
  province: string;
  @ApiProperty()
  postal_code: string;
}