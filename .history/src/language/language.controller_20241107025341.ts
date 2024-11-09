import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './models/language.model';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Languages')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new language' })
  @ApiBody({ type: CreateLanguageDto })
  @ApiResponse({
    status: 201,
    description: 'The language has been successfully created.',
    type: Language,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  async create(@Body() createLanguageDto: CreateLanguageDto) {
    const language = await this.languageService.create(createLanguageDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Language created successfully',
      data: language,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all languages' })
  @ApiResponse({
    status: 200,
    description: 'Return all languages.',
    type: [Language],
  })
  async findAll() {
    const languages = await this.languageService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Languages retrieved successfully',
      data: languages,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a language by ID' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the language' })
  @ApiResponse({
    status: 200,
    description: 'Return the language.',
    type: Language,
  })
  @ApiResponse({ status: 404, description: 'Language not found.' })
  async findOne(@Param('id') id: string) {
    const language = await this.languageService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Language retrieved successfully',
      data: language,
    };
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Get a language by name' })
  @ApiParam({
    name: 'name',
    type: String,
    description: 'The name of the language',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the language by name.',
    type: Language,
  })
  @ApiResponse({ status: 404, description: 'Language not found.' })
  async getLanguageByName(@Param('name') name: string) {
    const language = await this.languageService.findLanguageByName(name);
    return {
      statusCode: HttpStatus.OK,
      message: 'Language retrieved successfully by name',
      data: language,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a language' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the language' })
  @ApiBody({ type: UpdateLanguageDto })
  @ApiResponse({
    status: 200,
    description: 'The language has been successfully updated.',
    type: Language,
  })
  @ApiResponse({ status: 404, description: 'Language not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    const language = await this.languageService.update(+id, updateLanguageDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Language updated successfully',
      data: language,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a language' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the language' })
  @ApiResponse({
    status: 200,
    description: 'The language has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Language not found.' })
  async remove(@Param('id') id: string) {
    await this.languageService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Language deleted successfully',
    };
  }
}
