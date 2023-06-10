import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entity/user.entity';

export class CreateTokenDto {
  @ApiProperty()
  user: UserEntity;
  @ApiProperty()
  token: string;
  @ApiProperty()
  expire_at: Date;
}