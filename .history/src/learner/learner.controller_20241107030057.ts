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
import { LearnerService } from './learner.service';
import { CreateLearnerDto } from './dto/create-learner.dto';
import { UpdateLearnerDto } from './dto/update-learner.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LearnerGuard } from '../guards/learner.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { LearnerSelfGuard } from '../guards/learner-self.guard';

@ApiTags('Learners')
@Controller('learner')
export class LearnerController {
  constructor(private readonly learnerService: LearnerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new learner' })
  @ApiResponse({
    status: 201,
    description: 'The learner has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @UseGuards(JwtAuthGuard)
  create(@Body() createLearnerDto: CreateLearnerDto) {
    return this.learnerService.create(createLearnerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all learners' })
  @ApiResponse({ status: 200, description: 'List of all learners.' })
  @UseGuards(JwtAuthGuard, AdminGuard)
  findAll() {
    return this.learnerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a learner by ID' })
  @ApiResponse({
    status: 200,
    description: 'The learner has been successfully found.',
  })
  @ApiResponse({ status: 404, description: 'Learner not found.' })
  @UseGuards(JwtAuthGuard, AdminGuard, LearnerSelfGuard)
  findOne(@Param('id') id: string) {
    return this.learnerService.findOne(+id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Get a learner by email' })
  @ApiResponse({
    status: 200,
    description: 'The learner has been successfully found by email.',
  })
  @ApiResponse({ status: 404, description: 'Learner not found.' })
  findByEmail(@Param('email') email: string) {
    return this.learnerService.findLearnerByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('nickname/:nickname')
  @ApiOperation({ summary: 'Get a learner by nickname' })
  @ApiResponse({
    status: 200,
    description: 'The learner has been successfully found by nickname.',
  })
  @ApiResponse({ status: 404, description: 'Learner not found.' })
  findByNickname(@Param('nickname') nickname: string) {
    return this.learnerService.findLearnerByNickname(nickname);
  }

  @UseGuards(JwtAuthGuard, AdminGuard, LearnerSelfGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a learner by ID' })
  @ApiResponse({
    status: 200,
    description: 'The learner has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Learner not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  update(@Param('id') id: string, @Body() updateLearnerDto: UpdateLearnerDto) {
    return this.learnerService.update(+id, updateLearnerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a learner by ID' })
  @ApiResponse({
    status: 200,
    description: 'The learner has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Learner not found.' })
  @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id') id: string) {
    return this.learnerService.remove(+id);
  }
}
