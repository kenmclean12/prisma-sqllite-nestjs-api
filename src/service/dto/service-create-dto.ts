/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  Min,
} from 'class-validator';

export class ServiceCreateDto {
  @ApiProperty({ description: 'Name of the service' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Optional description of the service',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Price of the service', minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Property ID this service belongs to' })
  @IsNumber()
  propertyId: number;
}
