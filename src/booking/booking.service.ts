/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingCreateDto, BookingResponseDto, BookingUpdateDto } from './dto';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number): Promise<BookingResponseDto> {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { service: true, user: true },
    });

    if (!booking) {
      throw new NotFoundException(`Booking ID ${id} not found`);
    }

    return booking as BookingResponseDto;
  }

  async findAll(): Promise<BookingResponseDto[]> {
    return (await this.prisma.booking.findMany({
      include: { service: true, user: true },
    })) as BookingResponseDto[];
  }

  async findByUser(userId: number): Promise<BookingResponseDto[]> {
    return (await this.prisma.booking.findMany({
      where: { userId },
      include: { service: true, user: true },
    })) as BookingResponseDto[];
  }

  async findByService(serviceId: number): Promise<BookingResponseDto[]> {
    return (await this.prisma.booking.findMany({
      where: { serviceId },
      include: { service: true, user: true },
    })) as BookingResponseDto[];
  }

  async create(dto: BookingCreateDto): Promise<BookingResponseDto> {
    const created = await this.prisma.booking.create({
      data: dto,
      include: { user: true, service: true },
    });

    if (!created) {
      throw new BadRequestException(`Failed to create booking`);
    }

    return created as BookingResponseDto;
  }

  async update(id: number, dto: BookingUpdateDto): Promise<BookingResponseDto> {
    const existing = await this.prisma.booking.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Booking ID ${id} not found`);
    }

    const updated = await this.prisma.booking.update({
      where: { id },
      data: dto,
      include: { user: true, service: true },
    });

    return updated as BookingResponseDto;
  }

  async remove(id: number): Promise<BookingResponseDto> {
    const existing = await this.prisma.booking.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Booking ID ${id} not found`);
    }

    await this.prisma.booking.delete({ where: { id } });
    return existing as BookingResponseDto;
  }
}
