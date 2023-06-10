import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  bio: string;
}