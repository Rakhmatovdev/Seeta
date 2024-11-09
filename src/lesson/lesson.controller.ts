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
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InstructorGuard } from '../common/guards/instructor.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('Lessons')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @UseGuards(InstructorGuard)
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create a lesson' })
  @ApiResponse({
    status: 201,
    description: 'The lesson has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }
  @UseGuards(AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Found all lessons' })
  @ApiResponse({
    status: 200,
    description: 'List of lessons Found successfully.',
  })
  findAll() {
    return this.lessonService.findAll();
  }
  @UseGuards(InstructorGuard)
  @UseGuards(AdminGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Found a lesson by ID' })
  @ApiResponse({ status: 200, description: 'Lesson Found successfully.' })
  @ApiResponse({ status: 404, description: 'Lesson not found.' })
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(+id);
  }
  @UseGuards(InstructorGuard)
  @ApiOperation({ summary: 'Update a lesson by ID' })
  @ApiResponse({
    status: 200,
    description: 'The lesson has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Lesson not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.update(+id, updateLessonDto);
  }
  // @UseGuards(InstructorGuard)

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lesson by ID' })
  @ApiResponse({
    status: 200,
    description: 'The lesson has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Lesson not found.' })
  remove(@Param('id') id: string) {
    return this.lessonService.remove(+id);
  }
}
