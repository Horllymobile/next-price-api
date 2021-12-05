import { ApiProperty } from '@nestjs/swagger';

export class ProductDTO {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  uom: string;

  @ApiProperty()
  company: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  date: string;
}
