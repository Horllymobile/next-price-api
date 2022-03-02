import { ApiProperty } from '@nestjs/swagger';

export class AddCommentDto {
  @ApiProperty()
  product_id?: number;

  @ApiProperty()
  user_id?: number;

  @ApiProperty()
  comment: string;
}
