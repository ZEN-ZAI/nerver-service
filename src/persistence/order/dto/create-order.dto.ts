import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from '../../address/entity/address.entity';
import { ProductEntity } from '../../product/entity/product.entity';
import { UserEntity } from '../../user/entity/user.entity';

export class CreateOrderDto {
  @ApiProperty()
  user: UserEntity;
  @ApiProperty()
  product: ProductEntity;
  @ApiProperty()
  address: AddressEntity;
  @ApiProperty()
  status: string;
}