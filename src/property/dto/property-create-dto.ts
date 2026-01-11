/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class PropertyCreateDto {
  @ApiProperty({ description: 'Name of the property', example: 'Beach House' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Location of the property',
    example: 'Vancouver',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: 'ID of the user who owns this property',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  ownerId: number;
}
