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
  import { ChapterTranslationService } from './chapter_translation.service';
  import { CreateChapterTranslationDto } from './dto/create-chapter_translation.dto';
  import { UpdateChapterTranslationDto } from './dto/update-chapter_translation.dto';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { ChapterTranslation } from './models/chapter_translation.model';
  import { AdminCreatorGuard } from '../common/guards/admin_creator.guard';
  import { AdminGuard } from '../guards/admin.guard';
  import { LearnerGuard } from '../guards/learner.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

  @ApiTags('Chapter Translation')
  @Controller('chapter-translation')
  export class ChapterTranslationController {
    constructor(
      private readonly chapterTranslationService: ChapterTranslationService,
    ) {}

    @ApiOperation({ summary: 'Create a new chapter translation' })
    @ApiResponse({
      status: 201,
      description: 'Chapter translation created successfully',
      type: ChapterTranslation,
    })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @UseGuards(JwtAuthGuard, AdminCreatorGuard)

    @Post()
    create(@Body() createChapterTranslationDto: CreateChapterTranslationDto) {
      return this.chapterTranslationService.create(createChapterTranslationDto);
    }

    @UseGuards(AdminGuard, LearnerGuard)
    @ApiOperation({ summary: 'Get all chapter translations' })
    @ApiResponse({
      status: 200,
      description: 'List of all chapter translations',
      type: [ChapterTranslation],
    })
    @UseGuards(JwtAuthGuard, AdminCreatorGuard)
    @Get()
    findAll() {
      return this.chapterTranslationService.findAll();
    }

    @ApiOperation({ summary: 'Get a chapter translation by ID' })
    @ApiResponse({
      status: 200,
      description: 'Chapter translation found',
      type: ChapterTranslation,
    })
    @ApiResponse({ status: 404, description: 'Chapter translation not found' })
    @UseGuards(JwtAuthGuard, LearnerGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.chapterTranslationService.findOne(+id);
    }

    @ApiOperation({ summary: 'Update a chapter translation by ID' })
    @ApiResponse({
      status: 200,
      description: 'Chapter translation updated successfully',
      type: ChapterTranslation,
    })
    @ApiResponse({ status: 404, description: 'Chapter translation not found' })
    @UseGuards(JwtAuthGuard, AdminCreatorGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateChapterTranslationDto: UpdateChapterTranslationDto,
    ) {
      return this.chapterTranslationService.update(
        +id,
        updateChapterTranslationDto,
      );
    }

    @ApiOperation({ summary: 'Delete a chapter translation by ID' })
    @ApiResponse({
      status: 200,
      description: 'Chapter translation deleted successfully',
    })
    @ApiResponse({ status: 404, description: 'Chapter translation not found' })
    @UseGuards(JwtAuthGuard, AdminGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.chapterTranslationService.remove(+id);
    }
  }
