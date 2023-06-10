import { ApiProperty } from '@nestjs/swagger';

export class UserCreateOrderDto {
  user_id: string;
  @ApiProperty()
  product_id: string;
  @ApiProperty()
  address_id: string;
}
