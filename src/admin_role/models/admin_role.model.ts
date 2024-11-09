import {
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  BelongsTo,
} from 'sequelize-typescript';
import { Admin } from '../../admin/models/admin.model';
import { Role } from '../../roles/models/role.model';

interface IAdminRoleCreationAttr {
  admin_id: number;
  role_id: number;
}
@Table({ tableName: 'adminRole', timestamps: false })
export class AdminRole extends Model<AdminRole, IAdminRoleCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => Admin)
  @Column({
    type: DataType.INTEGER,
  })
  admin_id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  role_id: number;

  @BelongsTo(() => Admin)
  admins: Admin;

  @BelongsTo(() => Role)
  roles: Role[];
}
