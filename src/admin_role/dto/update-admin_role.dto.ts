import { PartialType } from '@nestjs/swagger';
import { CreateAdminRoleDto } from './create-admin_role.dto';

export class UpdateAdminRoleDto extends PartialType(CreateAdminRoleDto) {}
