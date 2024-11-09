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
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Chapter } from './models/chapter.model'; // Import your Chapter model if needed.
import { InstructorGuard } from '../common/guards/instructor.guard';
import { AdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Chapters')
@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @UseGuards(JwtAuthGuard, InstructorGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new chapter' })
  @ApiResponse({
    status: 201,
    description: 'Chapter created successfully',
    type: Chapter,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chaptersService.create(createChapterDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Get all chapters' })
  @ApiResponse({
    status: 200,
    description: 'List of chapters',
    type: [Chapter],
  })
  findAll() {
    return this.chaptersService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a chapter by ID' })
  @ApiResponse({ status: 200, description: 'Chapter found', type: Chapter })
  @ApiResponse({ status: 404, description: 'Chapter not found' })
  findOne(@Param('id') id: string) {
    return this.chaptersService.findOne(+id);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Update a chapter by ID' })
  @ApiResponse({
    status: 200,
    description: 'Chapter updated successfully',
    type: Chapter,
  })
  @ApiResponse({ status: 404, description: 'Chapter not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chaptersService.update(+id, updateChapterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a chapter by ID' })
  @ApiResponse({ status: 204, description: 'Chapter deleted successfully' })
  @ApiResponse({ status: 404, description: 'Chapter not found' })
  remove(@Param('id') id: string) {
    return this.chaptersService.remove(+id);
  }
}
