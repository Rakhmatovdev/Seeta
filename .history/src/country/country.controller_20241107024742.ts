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
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Country } from './models/country.model';
import { AdminGuard } from '../guards/admin.guard'; // Import AdminGuard
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'; // Import JwtAuthGuard

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new country' })
  @ApiBody({ type: CreateCountryDto })
  @ApiResponse({
    status: 201,
    description: 'The country has been successfully created.',
    type: Country,
  })
  @UseGuards(JwtAuthGuard, AdminGuard) // Only Admins can create countries
  async create(@Body() createCountryDto: CreateCountryDto) {
    const country = await this.countryService.create(createCountryDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Country created successfully',
      data: country,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({
    status: 200,
    description: 'Return all countries.',
    type: [Country],
  })
  @UseGuards(JwtAuthGuard) // All authenticated users can view countries
  async findAll() {
    const countries = await this.countryService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Countries fetched successfully',
      data: countries,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a country by ID' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the country' })
  @ApiResponse({
    status: 200,
    description: 'Return the country by ID.',
    type: Country,
  })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  @UseGuards(JwtAuthGuard) // All authenticated users can view a country by ID
  async findOne(@Param('id') id: string) {
    const country = await this.countryService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Country fetched successfully',
      data: country,
    };
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Get a country by name' })
  @ApiParam({
    name: 'name',
    type: String,
    description: 'The name of the country',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the country by name.',
    type: Country,
  })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  @UseGuards(JwtAuthGuard) // All authenticated users can search for a country by name
  async getCountryByName(@Param('name') name: string) {
    const country = await this.countryService.findCountryByName(name);
    return {
      statusCode: HttpStatus.OK,
      message: 'Country fetched successfully by name',
      data: country,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a country' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the country' })
  @ApiBody({ type: UpdateCountryDto })
  @ApiResponse({
    status: 200,
    description: 'The country has been successfully updated.',
    type: Country,
  })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  @UseGuards(JwtAuthGuard, AdminGuard) // Only Admins can update countries
  async update(
    @Param('id') id: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    const country = await this.countryService.update(+id, updateCountryDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Country updated successfully',
      data: country,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a country' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the country' })
  @ApiResponse({
    status: 200,
    description: 'The country has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  @UseGuards(JwtAuthGuard, AdminGuard) // Only Admins can delete countries
  async remove(@Param('id') id: string) {
    await this.countryService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Country deleted successfully',
    };
  }
}