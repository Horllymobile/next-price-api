import { ApiProperty } from '@nestjs/swagger';
import { UOM } from 'src/core/enums/unit-of-measurement';

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
  uom: UOM;

  @ApiProperty()
  company: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  date: string;
}
