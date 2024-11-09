import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Country } from '../../country/models/country.model';
import { Language } from '../../language/models/language.model';
import { Friend } from '../../friend/models/friend.model';
import { LearnerProgress } from '../../learner_progress/models/learner_progress.model';
import { LearnerSubscription } from '../../learner_subscriptions/models/learner_subscription.model';

interface ILearnerCreationAttr {
  fullname: string;
  nickname?: string;
  profile_photo?: string;
  phone?: string;
  native_lang_id: number;
  country_id: number;
  email: string;
  hashed_password: string;
  provider_id: number;
  is_active: boolean;
}

@Table({ tableName: 'learners', timestamps: true })
export class Learner extends Model<Learner, ILearnerCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  fullname: string;
  @Column({
    type: DataType.STRING,
  })
  nickname?: string;
  @Column({
    type: DataType.STRING,
  })
  profile_photo?: string;
  @Column({
    type: DataType.STRING,
  })
  phone?: string;

  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
  })
  native_lang_id: number;

  @ForeignKey(() => Country)
  @Column({
    type: DataType.INTEGER,
  })
  country_id: number;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
  @Column({
    type: DataType.INTEGER,
  })
  provider_id: number;
  @Column({
    type: DataType.BOOLEAN,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
  @BelongsTo(() => Language)
  language: Language;
  @BelongsTo(() => Country)
  country: Country;
  @HasMany(() => Friend, 'learner_id1')
  friendsInitiated: Friend[];

  @HasMany(() => Friend, 'learner_id2')
  friendsReceived: Friend[];
  @HasMany(() => LearnerProgress)
  learner_progresses: LearnerProgress;
  @HasMany(() => LearnerSubscription)
  learner_subscriptions: LearnerSubscription[];
}
