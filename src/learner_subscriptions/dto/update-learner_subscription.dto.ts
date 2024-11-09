import { PartialType } from '@nestjs/swagger';
import { CreateLearnerSubscriptionDto } from './create-learner_subscription.dto';

export class UpdateLearnerSubscriptionDto extends PartialType(CreateLearnerSubscriptionDto) {}
