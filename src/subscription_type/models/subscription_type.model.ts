import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { LearnerSubscription } from '../../learner_subscriptions/models/learner_subscription.model';
import { Duration } from '../../duration/models/duration.model';

interface ISubscriptionTypeCreationAtrr {
  name: string;
  price: number;
  duration_id: number;
}
@Table({ tableName: 'subscription_types' })
export class SubscriptionType extends Model<
  SubscriptionType,
  ISubscriptionTypeCreationAtrr
> {
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
  name: string;
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  price: number;
  @ForeignKey(() => Duration)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  duration_id: number;
  @BelongsTo(() => Duration)
  durations: Duration[];
}
