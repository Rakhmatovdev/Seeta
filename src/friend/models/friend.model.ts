import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Learner } from '../../learner/models/learner.model';

interface IFriendCreationAtrr {
  learner_id1: number;
  learner_id2: number;
}
@Table({ tableName: 'friends', timestamps: true })
export class Friend extends Model<Friend, IFriendCreationAtrr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => Learner)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  learner_id1: number;
  @ForeignKey(() => Learner)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  learner_id2: number;

 @BelongsTo(() => Learner, 'learner_id1')
learner1: Learner;

@BelongsTo(() => Learner, 'learner_id2')
learner2: Learner;


}
