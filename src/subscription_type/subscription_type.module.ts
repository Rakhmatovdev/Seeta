import { Module } from '@nestjs/common';
import { SubscriptionTypeService } from './subscription_type.service';
import { SubscriptionTypeController } from './subscription_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubscriptionType } from './models/subscription_type.model';
import { DurationService } from '../duration/duration.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([SubscriptionType]),
    JwtModule.register({}),
  ],
  controllers: [SubscriptionTypeController],
  providers: [SubscriptionTypeService],
  // exports: [SubscriptionTypeService],
})
export class SubscriptionTypeModule {}
