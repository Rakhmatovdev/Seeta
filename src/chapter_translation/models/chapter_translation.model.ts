import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Chapter } from '../../chapters/models/chapter.model';
import { Language } from '../../language/models/language.model';

interface IChapterTranslationCreationAttr {
  chapter_id: number;
  lang_id: number;
  title: string;
  content: string;
}
@Table({ tableName: 'chapter_translation', timestamps: true })
export class ChapterTranslation extends Model<
  ChapterTranslation,
  IChapterTranslationCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => Chapter)
  @Column({
    type: DataType.INTEGER,
  })
  chapter_id: number;
  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
  })
  lang_id: number;
  @Column({
    type: DataType.STRING,
  })
  title: string;
  @Column({
    type: DataType.STRING,
  })
  content: string;

  @BelongsTo(() => Chapter)
  chapter: Chapter;
  @BelongsTo(() => Language)
  language: Language;
}
