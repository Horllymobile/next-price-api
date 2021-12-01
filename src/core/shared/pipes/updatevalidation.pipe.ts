import { UpdateUserDto } from './../../../app/user/dto/user.dto';
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';
@Injectable()
export class UpdateValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(value: UpdateUserDto, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) throw new BadRequestException(error, 'Validation failed');
    return value;
  }
}
