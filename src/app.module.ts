import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.model';
import { AuthModule } from './auth/auth.module';
import { Role } from './roles/models/role.model';
import { RoleModule } from './roles/role.module';
import { AdminRoleModule } from './admin_role/admin_role.module';
import { AdminRole } from './admin_role/models/admin_role.model';
import { CountryModule } from './country/country.module';
import { LanguageModule } from './language/language.module';
import { FriendModule } from './friend/friend.module';
import { ChaptersModule } from './chapters/chapters.module';
import { ChapterTranslationModule } from './chapter_translation/chapter_translation.module';
import { LessonModule } from './lesson/lesson.module';
import { CheckpointModule } from './checkpoint/checkpoint.module';
import { Language } from './language/models/language.model';
import { Chapter } from './chapters/models/chapter.model';
import { Lesson } from './lesson/models/lesson.model';
import { Country } from './country/models/country.model';
import { Checkpoint } from './checkpoint/models/checkpoint.model';
import { ChapterTranslation } from './chapter_translation/models/chapter_translation.model';
import { LearnerModule } from './learner/learner.module';
import { Learner } from './learner/models/learner.model';
import { LearnerProgressModule } from './learner_progress/learner_progress.module';
import { LearnerProgress } from './learner_progress/models/learner_progress.model';
import { LearnerSubscriptionsModule } from './learner_subscriptions/learner_subscriptions.module';
import { SubscriptionTypeModule } from './subscription_type/subscription_type.module';
import { DurationModule } from './duration/duration.module';
import { SubscriptionType } from './subscription_type/models/subscription_type.model';
import { Duration } from './duration/models/duration.model';
import { LearnerSubscription } from './learner_subscriptions/models/learner_subscription.model';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Admin, Role, AdminRole],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    SequelizeModule.forFeature([
      Admin,
      Role,
      AdminRole,
      Language,
      Chapter,
      Lesson,
      Country,
      Checkpoint,
      ChapterTranslation,
      Learner,
      LearnerProgress,
      SubscriptionType,
      Duration,
      LearnerSubscription,
    ]),

    AdminModule,
    MailModule,
    AuthModule,
    RoleModule,
    AdminRoleModule,
    CountryModule,
    LanguageModule,
    FriendModule,
    ChaptersModule,
    ChapterTranslationModule,
    LessonModule,
    CheckpointModule,
    LearnerModule,
    LearnerProgressModule,
    LearnerSubscriptionsModule,
    SubscriptionTypeModule,
    DurationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
