import { ApiProperty } from '@nestjs/swagger';
import { ProfileEntity } from '../../profile/entity/profile.entity';

export class CreateUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  profile: ProfileEntity;
}