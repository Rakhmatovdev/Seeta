import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './models/role.model';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Add a new role' })
  @ApiResponse({
    status: 201,
    description: 'New role successfully created',
    type: Role,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LearnerProgressService } from './learner_progress.service';
import { CreateLearnerProgressDto } from './dto/create-learner_progress.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateLearnerProgressDto } from './dto/update-learner_progress.dto';

@ApiTags('Learner-progresses') 
@Controller('learner-progress')
export class LearnerProgressController {
  constructor(private readonly learnerProgressService: LearnerProgressService) {}

  @Post()
  @ApiOperation({ summary: 'Create a learner progress entry' })
  @ApiResponse({ status: 201, description: 'The learner progress has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createLearnerProgressDto: CreateLearnerProgressDto) {
    return this.learnerProgressService.create(createLearnerProgressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all learner progress entries' })
  @ApiResponse({ status: 200, description: 'Returns all learner progress entries.' })
  findAll() {
    return this.learnerProgressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific learner progress entry by ID' })
  @ApiResponse({ status: 200, description: 'Returns the learner progress entry.' })
  @ApiResponse({ status: 404, description: 'Learner progress not found.' })
  findOne(@Param('id') id: string) {
    return this.learnerProgressService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a learner progress entry by ID' })
  @ApiResponse({ status: 200, description: 'The learner progress has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Learner progress not found.' })
  update(@Param('id') id: string, @Body() updateLearnerProgressDto: UpdateLearnerProgressDto) {
    return this.learnerProgressService.update(+id, updateLearnerProgressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a learner progress entry by ID' })
  @ApiResponse({ status: 200, description: 'The learner progress has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Learner progress not found.' })
  remove(@Param('id') id: string) {
    return this.learnerProgressService.remove(+id);
  }
}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'Retrieve all roles' })
  @ApiResponse({
    status: 200,
    description: 'List of all roles',
    type: [Role], // Updated to indicate an array of roles
  })
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a role by name' })
  @ApiResponse({
    status: 200,
    description: 'Role fetched by name successfully',
    type: Role,
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
  })
  @Get('/role_name/:role_name')
  findRoleByName(@Param('role_name') role_name: string) {
    return this.rolesService.findRoleByName(role_name);
  }

  @ApiOperation({ summary: 'Retrieve a role by ID' })
  @ApiResponse({
    status: 200,
    description: 'Role fetched by ID successfully',
    type: Role,
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a role by ID' })
  @ApiResponse({
    status: 200,
    description: 'Role updated successfully',
    type: Role,
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @ApiOperation({ summary: 'Delete a role by ID' })
  @ApiResponse({
    status: 204,
    description: 'Role deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
