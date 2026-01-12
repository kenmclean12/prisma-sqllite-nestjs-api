/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

export class BookingCreateDto {
  @ApiProperty({ description: 'ID of the user making the booking' })
  @IsInt()
  userId: number;

  @ApiProperty({ description: 'ID of the service being booked' })
  @IsInt()
  serviceId: number;

  @ApiProperty({ description: 'Date of the booking in ISO format' })
  @IsDateString()
  date: string;

  @ApiProperty({ description: 'Status of the booking', required: false })
  @IsOptional()
  @IsString()
  status?: BookingStatus;
}
