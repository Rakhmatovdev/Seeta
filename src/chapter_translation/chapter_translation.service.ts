import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateChapterTranslationDto } from './dto/create-chapter_translation.dto';
import { UpdateChapterTranslationDto } from './dto/update-chapter_translation.dto';
import { ChapterTranslation } from './models/chapter_translation.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ChapterTranslationService {
  constructor(
    @InjectModel(ChapterTranslation)
    private chapterTranslationModel: typeof ChapterTranslation,
  ) {}

  async create(
    createChapterTranslationDto: CreateChapterTranslationDto,
  ): Promise<ChapterTranslation> {
    const chapterTranslation = await this.chapterTranslationModel.create(
      createChapterTranslationDto,
    );
    return chapterTranslation;
  }

  async findAll(): Promise<ChapterTranslation[]> {
    return await this.chapterTranslationModel.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number): Promise<ChapterTranslation> {
    const chapterTranslation = await this.chapterTranslationModel.findByPk(id);
    if (!chapterTranslation) {
      throw new NotFoundException(
        `Chapter translation with ID ${id} not found`,
      );
    }
    return chapterTranslation;
  }

  async update(
    id: number,
    updateChapterTranslationDto: UpdateChapterTranslationDto,
  ): Promise<ChapterTranslation> {
    const chapterTranslation = await this.findOne(id);
    await chapterTranslation.update(updateChapterTranslationDto);
    return chapterTranslation;
  }

  async remove(id: number): Promise<{ message: string }> {
    const chapterTranslation = await this.findOne(id);
    await chapterTranslation.destroy();
    return {
      message: `Chapter translation with ID ${id} successfully removed`,
    };
  }
}
