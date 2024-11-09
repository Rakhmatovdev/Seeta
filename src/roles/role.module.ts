import { Module } from '@nestjs/common';
import { RolesService } from './role.service';
import { RoleController } from './role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Role]), JwtModule.register({})],
  controllers: [RoleController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RoleModule {}
