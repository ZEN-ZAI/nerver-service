import { PartialType } from '@nestjs/swagger';
import { CreateUserHasAddressDto } from './create-user_has_address.dto';

export class UpdateUserHasAddressDto extends PartialType(CreateUserHasAddressDto) {
}