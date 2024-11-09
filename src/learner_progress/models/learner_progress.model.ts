import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Level } from '../../chapters/dto/level-value.dto';
import { Weekdays } from '../dto/create-learner_progress.dto';
import { Learner } from '../../learner/models/learner.model';
import { Lesson } from '../../lesson/models/lesson.model';

interface ILearnerProgressCreationAttr {
  learner_id: number;
  lesson_id: number;
  fluency: number;
  learned_words: number;
  level: Level;
  daily_streak: number;
  active_days: Weekdays;
}
@Table({ tableName: 'learner_progress', timestamps: true })
export class LearnerProgress extends Model<
  LearnerProgress,
  ILearnerProgressCreationAttr
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
  @ForeignKey(() => Lesson)
  @Column({
    type: DataType.INTEGER
  })
  lesson_id: number;
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  fluency: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  learned_words: number;
  @Column({
    type: DataType.ENUM,
    values: Object.values(Level),
  })
  level: Level;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  daily_streak: number;
  @Column({
    type: DataType.ENUM,
    values: Object.values(Weekdays),
  })
  active_days: Weekdays;

  @BelongsTo(() => Learner)
  learners: Learner[];
  @BelongsTo(() => Lesson)
  lesson: Lesson;
}
