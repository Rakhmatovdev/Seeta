import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ActivateLearnerDto,
  CreateLearnerDto,
  DeactivateLearnerDto,
} from './dto/create-learner.dto';
import { UpdateLearnerDto } from './dto/update-learner.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Learner } from './models/learner.model';
import * as bcrypt from 'bcrypt';
import { Country } from '../country/models/country.model';
import { Language } from '../language/models/language.model';
import { MailService } from '../mail/mail.service';

@Injectable()
export class LearnerService {
  constructor(@InjectModel(Learner) private learnerModel: typeof Learner,
private readonly mailService: MailService) {}

  async create(createLearnerDto: CreateLearnerDto): Promise<Learner> {
    const existingLearner = await this.learnerModel.findOne({
      where: { email: createLearnerDto.email },
    });
    if (existingLearner) {
      throw new BadRequestException('Learner with this email already exists');
    }
    if (createLearnerDto.password !== createLearnerDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashedPassword = await bcrypt.hash(createLearnerDto.password, 7);
    const newLearner = await this.learnerModel.create({
      ...createLearnerDto,
      hashed_password: hashedPassword,
    });
    return newLearner;
  }

  async activateLearner(
    activateLearnerDto: ActivateLearnerDto,
  ): Promise<Learner> {
    const learner = await this.learnerModel.findByPk(
      activateLearnerDto.learnerId,
    );
    if (!learner) {
      throw new NotFoundException('Learner not found');
    }
    learner.is_active = true;
    await learner.save();
    return learner;
  }

  async deactivateLearner(
    deactivateLearnerDto: DeactivateLearnerDto,
  ): Promise<Learner> {
    const learner = await this.learnerModel.findByPk(
      deactivateLearnerDto.learnerId,
    );
    if (!learner) {
      throw new NotFoundException('Learner not found');
    }
    learner.is_active = false;
    await learner.save();
    return learner;
  }

  async findLearnerByNickname(nickname: string): Promise<Learner> {
    const learner = await this.learnerModel.findOne({
      where: { nickname },
    });
    if (!learner) {
      throw new NotFoundException(
        `Learner with nickname ${nickname} not found`,
      );
    }
    return learner;
  }

  async findLearnerByEmail(email: string): Promise<Learner> {
    return this.learnerModel.findOne({ where: { email } });
  }

  async findAll(): Promise<Learner[]> {
    return this.learnerModel.findAll({
      include: [{ model: Country }, { model: Language }],
    });
  }

  async findOne(id: number): Promise<Learner> {
    const learner = await this.learnerModel.findByPk(id);
    if (!learner) {
      throw new NotFoundException(`Learner with ID ${id} not found`);
    }
    return learner;
  }

  async update(
    id: number,
    updateLearnerDto: UpdateLearnerDto,
  ): Promise<{ message: string; data: Learner }> {
    const learner = await this.findOne(id);
    await learner.update(updateLearnerDto);
    return {
      message: 'Learner updated successfully',
      data: learner,
    };
  }

  async remove(id: number): Promise<{ statusCode: number; message: string }> {
    const deleted = await this.learnerModel.destroy({ where: { id } });
    if (deleted) {
      return {
        statusCode: 200,
        message: 'Learner deleted successfully',
      };
    }
    throw new NotFoundException(`Learner with ID ${id} not found`);
  }
}
