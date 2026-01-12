import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus } from './booking-create-dto';

export class BookingResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  serviceId: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  status: BookingStatus;

  @ApiProperty()
  createdAt: Date;
}
