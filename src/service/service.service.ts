/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceCreateDto, ServiceUpdateDto, ServiceResponseDto } from './dto';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number): Promise<ServiceResponseDto> {
    const service = await this.prisma.service.findUnique({ where: { id } });
    if (!service) {
      throw new NotFoundException(
        `No service found with the provided id: ${id}`,
      );
    }

    return service as ServiceResponseDto;
  }

  async findByProperty(propertyId: number): Promise<ServiceResponseDto[]> {
    return (await this.prisma.service.findMany({
      where: { propertyId },
    })) as ServiceResponseDto[];
  }

  async findAll(): Promise<ServiceResponseDto[]> {
    return (await this.prisma.service.findMany()) as ServiceResponseDto[];
  }

  async create(dto: ServiceCreateDto): Promise<ServiceResponseDto> {
    const created = await this.prisma.service.create({ data: dto });
    if (!created) {
      throw new BadRequestException(
        `Could not create service entry with provided data: ${JSON.stringify(dto)}`,
      );
    }

    return created as ServiceResponseDto;
  }

  async update(id: number, dto: ServiceUpdateDto): Promise<ServiceResponseDto> {
    const existing = await this.prisma.service.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(
        `No service found with the provided ID: ${id}`,
      );
    }

    const updated = await this.prisma.service.update({
      where: { id },
      data: dto,
    });

    if (!updated) {
      throw new BadRequestException(
        `Could not update service ID: ${id} as ${JSON.stringify(dto)}`,
      );
    }

    return updated as ServiceResponseDto;
  }

  async delete(id: number): Promise<ServiceResponseDto> {
    const existing = await this.prisma.service.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(
        `No service found with the provided ID: ${id}`,
      );
    }

    await this.prisma.service.delete({ where: { id } });
    return existing as ServiceResponseDto;
  }
}
