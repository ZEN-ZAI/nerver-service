import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
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
