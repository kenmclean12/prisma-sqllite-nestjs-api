import { ApiProperty } from '@nestjs/swagger';

export class ServiceResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  propertyId: number;

  @ApiProperty()
  createdAt: Date;
}
