import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Level } from '../dto/level-value.dto';
import { Language } from '../../language/models/language.model';
import { Lesson } from '../../lesson/models/lesson.model';
import { Checkpoint } from '../../checkpoint/models/checkpoint.model';

interface IChapterCreationAttr {
  langId: number;
  level: Level;
  chapter_number: number;
  title: string;
}

@Table({ tableName: 'chapters', timestamps: true })
export class Chapter extends Model<Chapter, IChapterCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
  })
  langId: number;

  @Column({
    type: DataType.ENUM,
    values: Object.values(Level),
  })
  level: Level;

  @Column({
    type: DataType.INTEGER,
  })
  chapter_number: number;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @BelongsTo(() => Language)
  langs: Language;

  @HasMany(() => Lesson)
  lessons: Lesson[];

  @HasMany(() => Checkpoint)
  checkpoints: Checkpoint[];
}
