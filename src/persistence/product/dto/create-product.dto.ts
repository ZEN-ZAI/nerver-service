import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  number: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  height: string;
  @ApiProperty()
  weight: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  price: number;
}