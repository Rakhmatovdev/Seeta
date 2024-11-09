import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Chapter } from '../../chapters/models/chapter.model';
import { LearnerProgress } from '../../learner_progress/models/learner_progress.model';

interface ILessonCreationAtrr {
  chapter_id: number;
  lesson_number: number;
  title: string;
  content: string;
}
@Table({ tableName: 'lessons', timestamps: true })
export class Lesson extends Model<Lesson, ILessonCreationAtrr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => Chapter)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  chapter_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  lesson_number: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  title: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  content: string;
  @BelongsTo(() => Chapter)
  chapters: Chapter;
  
  @HasMany(() => LearnerProgress)
  learnerProgress: LearnerProgress;
}
