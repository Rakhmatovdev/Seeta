import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { Checkpoint } from './models/checkpoint.model';

@Injectable()
export class CheckpointService {
  constructor(
    @InjectModel(Checkpoint)
    private readonly checkpointModel: typeof Checkpoint,
  ) {}

  async create(createCheckpointDto: CreateCheckpointDto): Promise<Checkpoint> {
    return await this.checkpointModel.create(createCheckpointDto);
  }

  async findAll(): Promise<Checkpoint[]> {
    return await this.checkpointModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Checkpoint> {
    const checkpoint = await this.checkpointModel.findByPk(id);
    if (!checkpoint) {
      throw new NotFoundException(`Checkpoint with ID ${id} not found`);
    }
    return checkpoint;
  }

  async update(
    id: number,
    updateCheckpointDto: UpdateCheckpointDto,
  ): Promise<Checkpoint> {
    const checkpoint = await this.findOne(id);
    await checkpoint.update(updateCheckpointDto);
    return checkpoint;
  }

  async remove(id: number): Promise<{ message: string }> {
    const checkpoint = await this.findOne(id);
    await checkpoint.destroy();
    return { message: `Checkpoint with ID ${id} successfully removed` };
  }
}
