import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLearnerProgressDto } from './dto/create-learner_progress.dto';
import { UpdateLearnerProgressDto } from './dto/update-learner_progress.dto';
import { InjectModel } from '@nestjs/sequelize';
import { LearnerProgress } from './models/learner_progress.model';

@Injectable()
export class LearnerProgressService {
  constructor(
    @InjectModel(LearnerProgress)
    private learnerProgressModel: typeof LearnerProgress,
    
  ) {}

  async create(
    createLearnerProgressDto: CreateLearnerProgressDto,
  ): Promise<LearnerProgress> {
    const learnerProgress = await this.learnerProgressModel.create(
      createLearnerProgressDto,
    );
    return learnerProgress;
  }

  async findAll(): Promise<LearnerProgress[]> {
    const learnerProgressList = await this.learnerProgressModel.findAll({
      include: { all: true },
    });
    return learnerProgressList;
  }

  async findOne(id: number): Promise<LearnerProgress> {
    const learnerProgress = await this.learnerProgressModel.findByPk(id);
    if (!learnerProgress) {
      throw new NotFoundException(`Learner progress with ID ${id} not found`);
    }
    return learnerProgress;
  }

  async update(
    id: number,
    updateLearnerProgressDto: UpdateLearnerProgressDto,
  ): Promise<LearnerProgress> {
    const learnerProgress = await this.findOne(id);
    await learnerProgress.update(updateLearnerProgressDto);
    return learnerProgress;
  }

  async remove(id: number): Promise<void> {
    const learnerProgress = await this.findOne(id);
    await learnerProgress.destroy();
  }
}
