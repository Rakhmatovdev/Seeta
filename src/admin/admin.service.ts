import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as bcrypt from 'bcrypt';
import { DeactivateAdminDto } from './dto/deactivate-admin.dto';
import { ActivateAdminDto } from './dto/activate-admin.dto';
import { AdminRole } from '../admin_role/models/admin_role.model';
import { Role } from '../roles/models/role.model';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const existingAdmin = await this.adminModel.findOne({
      where: { email: createAdminDto.email },
    });
    if (existingAdmin) {
      throw new BadRequestException('Admin with this email already exists');
    }
    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password: hashedPassword,
    });
    return newAdmin;
  }

  async activateAdmin(activateAdminDto: ActivateAdminDto) {
    const admin = await this.adminModel.findByPk(activateAdminDto.adminId);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    admin.is_active = true;
    await admin.save();
    return admin;
  }

  async deactivateAdmin(deactivateAdminDto: DeactivateAdminDto) {
    const admin = await this.adminModel.findByPk(deactivateAdminDto.adminId);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    admin.is_active = false;
    await admin.save();
    return admin;
  }

  async findAdminByEmail(email: string): Promise<Admin> {
    return this.adminModel.findOne({ where: { email } });
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.findAll({ include: AdminRole });
  }

  async findOne(id: number): Promise<Admin | null> {
    const admin = await this.adminModel.findByPk(id, { include: AdminRole });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  async update(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<{ message: string; data: Admin }> {
    const admin = await this.findOne(id);
    await admin.update(updateAdminDto);
    return {
      message: 'Admin updated successfully',
      data: admin,
    };
  }

  async remove(id: number) {
    const deleted = await this.adminModel.destroy({ where: { id } });
    if (deleted) {
      return {
        statusCode: 200,
        message: 'Admin deleted successfully',
      };
    }
    throw new NotFoundException(`Admin with ID ${id} not found`);
  }
}
