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
import { ServiceService } from './service.service';
import { ServiceCreateDto, ServiceUpdateDto, ServiceResponseDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all services' })
  @ApiResponse({ status: 200, description: 'List of all services' })
  async findAll(): Promise<ServiceResponseDto[]> {
    return this.serviceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a service by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the service' })
  @ApiResponse({ status: 200, description: 'The found service' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ServiceResponseDto> {
    return this.serviceService.findOne(id);
  }

  @Get('property/:propertyId')
  @ApiOperation({ summary: 'Get all services for a property' })
  @ApiParam({ name: 'propertyId', type: Number, description: 'Property ID' })
  async findByProperty(
    @Param('propertyId', ParseIntPipe) propertyId: number,
  ): Promise<ServiceResponseDto[]> {
    return this.serviceService.findByProperty(propertyId);
  }

  @Post()
  @ApiBody({ type: ServiceCreateDto })
  @ApiOperation({ summary: 'Create a new service' })
  @ApiResponse({ status: 201, description: 'Service created' })
  async create(@Body() dto: ServiceCreateDto): Promise<ServiceResponseDto> {
    return this.serviceService.create(dto);
  }

  @Patch(':id')
  @ApiBody({ type: ServiceUpdateDto })
  @ApiOperation({ summary: 'Update service information by ID' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ServiceUpdateDto,
  ): Promise<ServiceResponseDto> {
    return this.serviceService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a service by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Service deleted' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ServiceResponseDto> {
    return this.serviceService.delete(id);
  }
}
