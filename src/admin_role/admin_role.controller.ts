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
import { AdminRoleService } from './admin_role.service';
import { CreateAdminRoleDto } from './dto/create-admin_role.dto';
import { UpdateAdminRoleDto } from './dto/update-admin_role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from '../admin/models/admin.model';
import { AdminRole } from './models/admin_role.model';
import { AdminCreatorGuard } from '../common/guards/admin_creator.guard';
import { AdminGuard } from '../guards/admin.guard';
import { AdminSelfGuard } from '../guards/admin-self.guard';
@ApiTags('Admin-role')
@Controller('admin-role')
export class AdminRoleController {
  constructor(private readonly adminRoleService: AdminRoleService) {}
  @UseGuards(AdminCreatorGuard)
  @ApiOperation({ summary: 'Adding new admin role' })
  @ApiResponse({
    status: 201,
    description: 'Adding new admin role',
    type: AdminRole,
  })
  @Post()
  create(@Body() createAdminRoleDto: CreateAdminRoleDto) {
    return this.adminRoleService.create(createAdminRoleDto);
  }
  @UseGuards(AdminCreatorGuard)
  @ApiOperation({ summary: 'Get all admin role' })
  @ApiResponse({
    status: 200,
    description: 'List of admin roles',
    type: AdminRole,
  })
  @Get()
  findAll() {
    return this.adminRoleService.findAll();
  }
  
  @UseGuards(AdminSelfGuard)
  @ApiOperation({ summary: 'Get role by ID' })
  @ApiResponse({
    status: 201,
    description: 'Role fetched by ID successfully',
    type: AdminRole,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminRoleService.findOne(+id);
  }
  @UseGuards(AdminCreatorGuard)
  @ApiOperation({ summary: 'Patch adminrole by ID' })
  @ApiResponse({
    status: 200,
    description: 'Patch admin role By Id',
    type: AdminRole,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminRoleDto: UpdateAdminRoleDto,
  ) {
    return this.adminRoleService.update(+id, updateAdminRoleDto);
  }
  @UseGuards(AdminCreatorGuard)
  @ApiOperation({ summary: 'Delete admin role by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delete admin role by Id',
    type: AdminRole,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminRoleService.remove(+id);
  }
}
