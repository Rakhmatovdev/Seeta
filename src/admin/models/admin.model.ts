import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from '../../roles/models/role.model';
import { AdminRole } from '../../admin_role/models/admin_role.model';

interface IAdminCreationAttr {
  name?: string;
  profile_photo?: string;
  email: string;
  hashed_password: string;
  is_active: boolean;
  is_creator: boolean;
}

@Table({ tableName: 'admin', timestamps: true })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  profile_photo: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_creator: boolean;

  @BelongsToMany(() => Role, () => AdminRole)
  roles: Role[];
  
  @HasMany(() => AdminRole)
  adminRoles: AdminRole;
}
