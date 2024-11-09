import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { AdminRole } from '../../admin_role/models/admin_role.model';
import { Admin } from '../../admin/models/admin.model';

interface IRoleCreationAttr {
  role_name: string;
  description: string;
}
@Table({ tableName: 'role', timestamps: false })
export class Role extends Model<Role, IRoleCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  role_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

 
  @BelongsToMany(() => Admin, () => AdminRole)
  admins: Admin[];
  
  @HasMany(() => AdminRole)
  admin_roles: AdminRole[];
}
