import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLearnerSubscriptionDto } from './dto/create-learner_subscription.dto';
import { UpdateLearnerSubscriptionDto } from './dto/update-learner_subscription.dto';
import { InjectModel } from '@nestjs/sequelize';
import { LearnerSubscription } from './models/learner_subscription.model'; // Make sure this model exists

@Injectable()
export class LearnerSubscriptionsService {
  constructor(
    @InjectModel(LearnerSubscription)
    private learnerSubscriptionModel: typeof LearnerSubscription,
  ) {}

  async create(
    createLearnerSubscriptionDto: CreateLearnerSubscriptionDto,
  ): Promise<LearnerSubscription> {
    try {
      const learnerSubscription = await this.learnerSubscriptionModel.create(
        createLearnerSubscriptionDto,
      );
      return learnerSubscription;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create subscription');
    }
  }

  async findAll(): Promise<LearnerSubscription[]> {
    try {
      const learnerSubscriptionList = await this.learnerSubscriptionModel.findAll({
        include: { all: true },
      });
      return learnerSubscriptionList;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve subscriptions');
    }
  }

  async findOne(id: number): Promise<LearnerSubscription> {
    const learnerSubscription = await this.learnerSubscriptionModel.findByPk(id);
    if (!learnerSubscription) {
      throw new NotFoundException(`Learner subscription with ID ${id} not found`);
    }
    return learnerSubscription;
  }

  async update(
    id: number,
    updateLearnerSubscriptionDto: UpdateLearnerSubscriptionDto,
  ): Promise<LearnerSubscription> {
    const learnerSubscription = await this.findOne(id);
    try {
      await learnerSubscription.update(updateLearnerSubscriptionDto);
      return learnerSubscription;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update subscription');
    }
  }

  async remove(id: number): Promise<void> {
    const learnerSubscription = await this.findOne(id);
    await learnerSubscription.destroy();
  }
}

