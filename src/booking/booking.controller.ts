import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingCreateDto, BookingUpdateDto, BookingResponseDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a booking by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the booking' })
  @ApiResponse({
    status: 200,
    description: 'The found booking',
    type: BookingResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BookingResponseDto> {
    return await this.bookingService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiResponse({
    status: 200,
    description: 'List of all bookings',
    type: [BookingResponseDto],
  })
  async findAll(): Promise<BookingResponseDto[]> {
    return await this.bookingService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all bookings for a specific user' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'List of bookings for the user',
    type: [BookingResponseDto],
  })
  async findByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<BookingResponseDto[]> {
    return await this.bookingService.findByUser(userId);
  }

  @Get('service/:serviceId')
  @ApiOperation({ summary: 'Get all bookings for a specific service' })
  @ApiParam({
    name: 'serviceId',
    type: Number,
    description: 'ID of the service',
  })
  @ApiResponse({
    status: 200,
    description: 'List of bookings for the service',
    type: [BookingResponseDto],
  })
  async findByService(
    @Param('serviceId', ParseIntPipe) serviceId: number,
  ): Promise<BookingResponseDto[]> {
    return await this.bookingService.findByService(serviceId);
  }

  @Post()
  @ApiBody({ type: BookingCreateDto })
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({
    status: 201,
    description: 'Booking created',
    type: BookingResponseDto,
  })
  async create(@Body() dto: BookingCreateDto): Promise<BookingResponseDto> {
    return await this.bookingService.create(dto);
  }

  @Patch(':id')
  @ApiBody({ type: BookingUpdateDto })
  @ApiOperation({ summary: 'Update a booking' })
  @ApiResponse({
    status: 200,
    description: 'Booking updated',
    type: BookingResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: BookingUpdateDto,
  ): Promise<BookingResponseDto> {
    return await this.bookingService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the booking' })
  @ApiResponse({
    status: 200,
    description: 'Booking deleted',
    type: BookingResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BookingResponseDto> {
    return await this.bookingService.remove(id);
  }
}
