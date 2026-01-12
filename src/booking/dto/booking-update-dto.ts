import { PartialType, PickType } from '@nestjs/swagger';
import { BookingCreateDto } from './booking-create-dto';

export class BookingUpdateDto extends PartialType(
  PickType(BookingCreateDto, ['date', 'status'] as const),
) {}
