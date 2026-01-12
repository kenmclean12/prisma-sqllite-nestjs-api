import { OmitType, PartialType } from '@nestjs/swagger';
import { ServiceCreateDto } from './service-create-dto';

export class ServiceUpdateDto extends PartialType(
  OmitType(ServiceCreateDto, ['propertyId'] as const),
) {}
