
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Chapter } from '../../chapters/models/chapter.model';

interface ICheckPointCreationAttr {
  chapter_id: number;
  test_id: number;
}
@Table({ tableName: 'checkpoints', timestamps: true })
export class Checkpoint extends Model<Checkpoint, ICheckPointCreationAttr> {
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
  //   @ForeignKey(() => Test)
  @Column({
    type: DataType.INTEGER,
  })
  test_id: number;

  @BelongsTo(() => Chapter)
  chapters: Chapter[];
}
