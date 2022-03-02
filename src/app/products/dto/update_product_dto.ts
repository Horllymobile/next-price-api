import { ApiProperty } from '@nestjs/swagger';
import { UOM } from 'src/core/enums/unit-of-measurement';

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
  description: string;
}
