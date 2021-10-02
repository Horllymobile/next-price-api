import { UserDto } from './../../../app/user/dto/user.dto';
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';
@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(value: UserDto, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) throw new BadRequestException(error, 'Validation failed');
    return value;
  }
}
