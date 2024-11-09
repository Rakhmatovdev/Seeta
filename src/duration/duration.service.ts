import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Duration } from './models/duration.model';
import { CreateDurationDto } from './dto/create-duration.dto';
import { UpdateDurationDto } from './dto/update-duration.dto';
import { SubscriptionType } from '../subscription_type/models/subscription_type.model';

@Injectable()
export class DurationService {
  constructor(@InjectModel(Duration) private durationModel: typeof Duration) {}

  async create(createDurationDto: CreateDurationDto): Promise<Duration> {
    return await this.durationModel.create(createDurationDto);
  }

  async findAll(): Promise<Duration[]> {
    return await this.durationModel.findAll();
  }

  async findOne(id: number): Promise<Duration> {
    const duration = await this.durationModel.findByPk(id);
    if (!duration) {
      throw new NotFoundException(`Duration with ID ${id} not found`);
    }
    return duration;
  }

  async update(
    id: number,
    updateDurationDto: UpdateDurationDto,
  ): Promise<Duration> {
    const duration = await this.findOne(id);
    await duration.update(updateDurationDto);
    return duration;
  }

  async remove(id: number): Promise<void> {
    const duration = await this.findOne(id);
    await duration.destroy();
  }
}
