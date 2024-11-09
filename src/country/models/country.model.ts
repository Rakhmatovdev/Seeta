import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Learner } from '../../learner/models/learner.model';

interface ICountryCreationAtrr {
  name: string;
}

@Table({ tableName: 'countries', timestamps: false })
export class Country extends Model<Country, ICountryCreationAtrr> {
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

  @HasMany(() => Learner)
  learners: Learner[];
}
