import { Module } from '@nestjs/common';
import { AdminRoleService } from './admin_role.service';
import { AdminRoleController } from './admin_role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminRole } from './models/admin_role.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([AdminRole]), JwtModule.register({})],
  controllers: [AdminRoleController],
  providers: [AdminRoleService],
  exports: [AdminRoleService],
})
export class AdminRoleModule {}
