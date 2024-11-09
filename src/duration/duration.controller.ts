import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DurationService } from './duration.service';
import { CreateDurationDto } from './dto/create-duration.dto';
import { UpdateDurationDto } from './dto/update-duration.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Duration } from './models/duration.model';

@ApiTags('Durations') 
@Controller('duration')
export class DurationController {
  constructor(private readonly durationService: DurationService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new duration' })
  @ApiResponse({
    status: 201,
    description: 'The duration has been successfully created.',
    type: Duration,
  }) 
  @ApiResponse({ status: 400, description: 'Bad Request.' }) 
  create(@Body() createDurationDto: CreateDurationDto) {
    return this.durationService.create(createDurationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Found all durations' }) 
  @ApiResponse({
    status: 200,
    description: 'List of durations.',
    type: [Duration],
  }) 
  findAll() {
    return this.durationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Found a duration by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the duration',
    required: true,
  }) 
  @ApiResponse({
    status: 200,
    description: 'The duration with the specified ID.',
    type: Duration,
  }) 
  @ApiResponse({ status: 404, description: 'Duration not found.' }) 
  findOne(@Param('id') id: string) {
    return this.durationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a duration by ID' }) 
  @ApiParam({
    name: 'id',
    description: 'The ID of the duration to update',
    required: true,
  }) 
  @ApiResponse({
    status: 200,
    description: 'The duration has been successfully updated.',
    type: Duration,
  }) 
  @ApiResponse({ status: 400, description: 'Bad Request.' }) 
  @ApiResponse({ status: 404, description: 'Duration not found.' }) 
  update(
    @Param('id') id: string,
    @Body() updateDurationDto: UpdateDurationDto,
  ) {
    return this.durationService.update(+id, updateDurationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a duration by ID' }) 
  @ApiParam({
    name: 'id',
    description: 'The ID of the duration to delete',
    required: true,
  }) 
  @ApiResponse({
    status: 204,
    description: 'The duration has been successfully deleted.',
  }) 
  @ApiResponse({ status: 404, description: 'Duration not found.' }) 
  remove(@Param('id') id: string) {
    return this.durationService.remove(+id);
  }
}
