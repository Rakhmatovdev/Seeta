import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LearnerProgressService } from './learner_progress.service';
import { CreateLearnerProgressDto } from './dto/create-learner_progress.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateLearnerProgressDto } from './dto/update-learner_progress.dto';

@ApiTags('Learner-progresses')
@Controller('learner-progress')
export class LearnerProgressController {
  constructor(
    private readonly learnerProgressService: LearnerProgressService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a learner progress entry' })
  @ApiResponse({
    status: 201,
    description: 'The learner progress has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() createLearnerProgressDto: CreateLearnerProgressDto) {
    return this.learnerProgressService.create(createLearnerProgressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all learner progress entries' })
  @ApiResponse({
    status: 200,
    description: 'Returns all learner progress entries.',
  })
  findAll() {
    return this.learnerProgressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific learner progress entry by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the learner progress entry.',
  })
  @ApiResponse({ status: 404, description: 'Learner progress not found.' })
  findOne(@Param('id') id: string) {
    return this.learnerProgressService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a learner progress entry by ID' })
  @ApiResponse({
    status: 200,
    description: 'The learner progress has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Learner progress not found.' })
  update(
    @Param('id') id: string,
    @Body() updateLearnerProgressDto: UpdateLearnerProgressDto,
  ) {
    return this.learnerProgressService.update(+id, updateLearnerProgressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a learner progress entry by ID' })
  @ApiResponse({
    status: 200,
    description: 'The learner progress has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Learner progress not found.' })
  remove(@Param('id') id: string) {
    return this.learnerProgressService.remove(+id);
  }
}
