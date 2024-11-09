import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAdminRoleDto } from './dto/create-admin_role.dto';
import { UpdateAdminRoleDto } from './dto/update-admin_role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AdminRole } from './models/admin_role.model';

@Injectable()
export class AdminRoleService {
  constructor(
    @InjectModel(AdminRole) private adminRolesModel: typeof AdminRole,
  ) {}

  async create(createAdminRoleDto: CreateAdminRoleDto) {
    try {
      const adminRole = await this.adminRolesModel.create(createAdminRoleDto);
      return adminRole;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create admin role');
    }
  }

  async findAll() {
    try {
      const adminRoles = await this.adminRolesModel.findAll({
        include: { all: true },
      });
      return adminRoles;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find admin roles');
    }
  }

  async findOne(id: number) {
    try {
      const adminRole = await this.adminRolesModel.findByPk(id);
      if (!adminRole) {
        throw new NotFoundException(`Admin role with id ${id} not found`);
      }
      return adminRole;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find admin role');
    }
  }

  async update(id: number, updateAdminRoleDto: UpdateAdminRoleDto) {
    try {
      const [updatedCount, [updatedAdminRole]] =
        await this.adminRolesModel.update(updateAdminRoleDto, {
          where: { id },
          returning: true,
        });
      if (updatedCount === 0) {
        throw new NotFoundException(`Admin role with id ${id} not found`);
      }
      return {
        message: 'Admin role updated successfully',
        data: updatedAdminRole,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update admin role');
    }
  }

  async remove(id: number) {
    try {
      const deletedCount = await this.adminRolesModel.destroy({
        where: { id },
      });
      if (deletedCount === 0) {
        throw new NotFoundException(`Admin role with id ${id} not found`);
      }
      return {
        statusCode: 200,
        message: 'Admin role deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete admin role');
    }
  }
}
