import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private rolesModel: typeof Role) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.rolesModel.create({
      role_name: createRoleDto.role_name.toUpperCase(),
      description: createRoleDto.description,
    });
    return role;
  }

  async findAll() {
    const roles = await this.rolesModel.findAll();
    return roles;
  }

  async findOne(id: number) {
    const role = await this.rolesModel.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return role;
  }

  async findRoleByName(value: string) {
    const role = await this.rolesModel.findOne({
      where: { role_name: value.toUpperCase() },
    });
    if (!role) {
      throw new NotFoundException(`Role with name ${value} not found`);
    }
    return role;
  }

  async update(
    id: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<{ message: string; data: Role }> {
    const role = await this.findOne(id);
    await role.update(updateRoleDto);
    return {
      message: 'Role updated successfully',
      data: role,
    };
  }

  async remove(id: number) {
    const deleted = await this.rolesModel.destroy({ where: { id } });
    if (deleted) {
      return {
        statusCode: 200,
        message: 'Role deleted successfully',
      };
    } else {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
  }
}
