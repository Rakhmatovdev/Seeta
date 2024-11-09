import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionTypeDto } from './dto/create-subscription_type.dto';
import { UpdateSubscriptionTypeDto } from './dto/update-subscription_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SubscriptionType } from './models/subscription_type.model'; // Ensure you have this model

@Injectable()
export class SubscriptionTypeService {
  constructor(
    @InjectModel(SubscriptionType)
    private subscriptionTypeModel: typeof SubscriptionType,
  ) {}

  async create(
    createSubscriptionTypeDto: CreateSubscriptionTypeDto,
  ): Promise<SubscriptionType> {
    return await this.subscriptionTypeModel.create(createSubscriptionTypeDto);
  }

  async findAll(): Promise<SubscriptionType[]> {
    return await this.subscriptionTypeModel.findAll();
  }

  async findOne(id: number): Promise<SubscriptionType> {
    const subscriptionType = await this.subscriptionTypeModel.findByPk(id);
    if (!subscriptionType) {
      throw new NotFoundException(`Subscription type with ID ${id} not found`);
    }
    return subscriptionType;
  }

  async update(
    id: number,
    updateSubscriptionTypeDto: UpdateSubscriptionTypeDto,
  ): Promise<SubscriptionType> {
    const subscriptionType = await this.findOne(id);
    return await subscriptionType.update(updateSubscriptionTypeDto);
  }

  async remove(id: number): Promise<void> {
    const subscriptionType = await this.findOne(id);
    await subscriptionType.destroy();
  }
}
