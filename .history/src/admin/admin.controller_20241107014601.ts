import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './models/admin.model';
import { ActivateAdminDto } from './dto/activate-admin.dto';
import { DeactivateAdminDto } from './dto/deactivate-admin.dto';
import { AdminCreatorGuard } from '../common/guards/admin_creator.guard';
import { AdminSelfGuard } from '../guards/admin-self.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Admins')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @UseGuards(AdminCreatorGuard)
  @ApiOperation({ summary: 'Adding new admin' })
  @ApiResponse({
    status: 201,
    description: 'Register new Admin',
    type: Admin,
  })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
  @UseGuards(AdminSelfGuard)
  @ApiOperation({ summary: 'Get admin by email' })
  @ApiResponse({
    status: 200,
    description: 'Admin fetched by email successfully',
    type: Admin,
  })
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.adminService.findAdminByEmail(email);
  }

  // @UseGuards(AdminSelfGuard)
  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({
    status: 200,
    description: 'List of admins',
    type: Admin,
  })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  // @UseGuards(AdminSelfGuard)
  @ApiOperation({ summary: 'Get admin by ID' })
  @ApiResponse({
    status: 201,
    description: 'Admin fetched by ID successfully',
    type: Admin,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(AdminSelfGuard)
  @ApiOperation({ summary: 'Patch admin by ID' })
  @ApiResponse({
    status: 200,
    description: 'Patch admin By Id',
    type: Admin,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete admin by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delete admin by Id',
    type: Admin,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
  @UseGuards(AdminSelfGuard)
  @ApiOperation({ summary: 'Activate the admin' })
  @ApiResponse({
    status: 200,
    description: 'Activating admin',
    type: Admin,
  })
  @HttpCode(200)
  @Post('activate')
  activateAdmin(@Body() activateAdminDto: ActivateAdminDto) {
    return this.adminService.activateAdmin(activateAdminDto);
  }
  @UseGuards(AdminCreatorGuard)
  @ApiOperation({ summary: 'Deactivate the admin' })
  @ApiResponse({
    status: 200,
    description: 'Deactivating admin',
    type: Admin,
  })
  @HttpCode(200)
  @Post('deactivate')
  deactivateAdmin(@Body() deactivateAdminDto: DeactivateAdminDto) {
    return this.adminService.activateAdmin(deactivateAdminDto);
  }
}
