import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson } from './models/lesson.model';
import { Chapter } from '../chapters/models/chapter.model';

@Injectable()
export class LessonService {
  constructor(@InjectModel(Lesson) private lessonModel: typeof Lesson) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    try {
      return await this.lessonModel.create(createLessonDto);
    } catch (error) {
      console.error('Error creating lesson:', error);
      throw new InternalServerErrorException('Failed to create lesson');
    }
  }

  async findAll(): Promise<Lesson[]> {
    try {
      return await this.lessonModel.findAll({ include: Chapter });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve lessons');
    }
  }

  async findOne(id: number): Promise<Lesson> {
    try {
      const lesson = await this.lessonModel.findByPk(id);
      if (!lesson) {
        throw new NotFoundException(`Lesson with ID ${id} not found`);
      }
      return lesson;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get lesson');
    }
  }

  async update(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    try {
      const lesson = await this.findOne(id);
      await lesson.update(updateLessonDto);
      return lesson;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update lesson');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const lesson = await this.findOne(id);
      await lesson.destroy();
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete lesson');
    }
  }
}
