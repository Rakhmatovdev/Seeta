import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Chapter } from '../../chapters/models/chapter.model';
import { Learner } from '../../learner/models/learner.model';
import { LearnerProgress } from '../../learner_progress/models/learner_progress.model';

interface ILanguageCreationAtrr {
  name: string;
}

@Table({ tableName: 'languages', timestamps: false })
export class Language extends Model<Language, ILanguageCreationAtrr> {
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
  @HasMany(() => Chapter)
  chapters: Chapter[];

  @HasMany(() => Learner)
  learners: Learner[];
}
