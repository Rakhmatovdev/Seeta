import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { SubscriptionType } from '../../subscription_type/models/subscription_type.model';

interface IDurationCreationAttr {
  duration_value: string;
}
@Table({ tableName: 'durations' })
export class Duration extends Model<Duration, IDurationCreationAttr> {
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
  duration_value: string;
@HasMany(()=> SubscriptionType)
subscription_type: SubscriptionType
}
