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
  @UseGuards
  (JwtAuthGuard, AdminGuard, LearnerSelfGuard)
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
