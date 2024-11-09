import { Module } from '@nestjs/common';
import { LearnerSubscriptionsService } from './learner_subscriptions.service';
import { LearnerSubscriptionsController } from './learner_subscriptions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LearnerSubscription } from './models/learner_subscription.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([LearnerSubscription]), JwtModule.register({}),
  ],
  controllers: [LearnerSubscriptionsController],
  providers: [LearnerSubscriptionsService],
})
export class LearnerSubscriptionsModule {}
