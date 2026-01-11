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
import { PropertyService } from './property.service';
import {
  PropertyCreateDto,
  PropertyUpdateDto,
  PropertyResponseDto,
} from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Property')
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a property by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the property' })
  @ApiResponse({
    status: 200,
    description: 'The found property',
    type: PropertyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Property not found' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PropertyResponseDto> {
    return await this.propertyService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all properties' })
  @ApiResponse({
    status: 200,
    description: 'List of all properties',
    type: [PropertyResponseDto],
  })
  async findAll(): Promise<PropertyResponseDto[]> {
    return await this.propertyService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all properties owned by a specific user' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'List of properties for the user',
    type: [PropertyResponseDto],
  })
  async findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<PropertyResponseDto[]> {
    return await this.propertyService.findByUserId(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new property' })
  @ApiBody({ type: PropertyCreateDto })
  @ApiResponse({
    status: 201,
    description: 'Property created',
    type: PropertyResponseDto,
  })
  async create(@Body() dto: PropertyCreateDto): Promise<PropertyResponseDto> {
    return await this.propertyService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update property information by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the property' })
  @ApiBody({ type: PropertyUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'Property updated',
    type: PropertyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Property not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PropertyUpdateDto,
  ): Promise<PropertyResponseDto> {
    return await this.propertyService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a property by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the property' })
  @ApiResponse({
    status: 200,
    description: 'Property deleted',
    type: PropertyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Property not found' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PropertyResponseDto> {
    return await this.propertyService.remove(id);
  }
}
