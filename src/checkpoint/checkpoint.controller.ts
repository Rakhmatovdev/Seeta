import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Checkpoint } from './models/checkpoint.model';
import { AdminGuard } from '../guards/admin.guard';
import { InstructorGuard } from '../common/guards/instructor.guard';

@ApiTags('Checkpoints ')
@Controller('checkpoint')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) {}
  @UseGuards(AdminGuard)
  @UseGuards(InstructorGuard)
  @ApiOperation({ summary: 'Create a new checkpoint' })
  @ApiResponse({
    status: 201,
    description: 'Checkpoint successfully created',
    type: Checkpoint,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data for checkpoint creation',
  })
  @Post()
  create(@Body() createCheckpointDto: CreateCheckpointDto) {
    return this.checkpointService.create(createCheckpointDto);
  }
  @UseGuards(AdminGuard)
  @UseGuards(InstructorGuard)
  @ApiOperation({ summary: 'Retrieve all checkpoints' })
  @ApiResponse({
    status: 200,
    description: 'List of all checkpoints',
    type: [Checkpoint],
  })
  @Get()
  findAll() {
    return this.checkpointService.findAll();
  }
  @UseGuards(AdminGuard)
  @UseGuards(InstructorGuard)
  @ApiOperation({ summary: 'Retrieve a checkpoint by ID' })
  @ApiResponse({
    status: 200,
    description: 'Checkpoint data found by ID',
    type: Checkpoint,
  })
  @ApiResponse({
    status: 404,
    description: 'Checkpoint not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkpointService.findOne(+id);
  }
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update a checkpoint by ID' })
  @ApiResponse({
    status: 200,
    description: 'Checkpoint successfully updated',
    type: Checkpoint,
  })
  @ApiResponse({
    status: 404,
    description: 'Checkpoint not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCheckpointDto: UpdateCheckpointDto,
  ) {
    return this.checkpointService.update(+id, updateCheckpointDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(InstructorGuard)
  @ApiOperation({ summary: 'Delete a checkpoint by ID' })
  @ApiResponse({
    status: 200,
    description: 'Checkpoint successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Checkpoint not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkpointService.remove(+id);
  }
}
