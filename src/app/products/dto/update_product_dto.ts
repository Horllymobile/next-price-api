import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  company: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  uom: string;

  @ApiProperty()
  description: string;
}
