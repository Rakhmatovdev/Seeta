import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Learner } from '../../learner/models/learner.model';
import { SubscriptionType } from '../../subscription_type/models/subscription_type.model';

interface ILearnerSubscriptionCreationAttr {
  learner_id: number;
  type_id: number;
  expire_date: string;
  is_auto_renew: boolean;
}
@Table({ tableName: 'learner_subscriptions', timestamps: true })
export class LearnerSubscription extends Model<
  LearnerSubscription,
  ILearnerSubscriptionCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @ForeignKey(() => Learner)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  learner_id: number;
  @ForeignKey(() => SubscriptionType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  type_id: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  expire_date: string;
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_auto_renew: boolean;

  @BelongsTo(() => Learner)
  learners: Learner;

  @BelongsTo(() => SubscriptionType)
  subscription_type: SubscriptionType;
}
