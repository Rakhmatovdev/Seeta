import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Chapter } from './models/chapter.model';
import { Lesson } from '../lesson/models/lesson.model';

@Injectable()
export class ChaptersService {
  constructor(@InjectModel(Chapter) private chapterModel: typeof Chapter) {}

  async create(createChapterDto: CreateChapterDto) {
    const chapter = await this.chapterModel.create(createChapterDto);
    return {
      message: 'Chapter created successfully',
      chapter,
    };
  }

  async findAll() {
    const chapters = await this.chapterModel.findAll({
      include: Lesson,
    });
    return {
      message: 'All chapters found successfully',
      chapters,
    };
  }

  async findOne(id: number) {
    const chapter = await this.chapterModel.findByPk(id);
    if (!chapter) {
      throw new NotFoundException(`Chapter with ID ${id} not found`);
    }
    return {
      message: `Chapter with ID ${id} retrieved successfully`,
      chapter,
    };
  }

  async update(id: number, updateChapterDto: UpdateChapterDto) {
    const [numberOfAffectedRows, [updatedChapter]] =
      await this.chapterModel.update(updateChapterDto, {
        where: { id },
        returning: true,
      });

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Chapter with ID ${id} not found`);
    }

    return {
      message: `Chapter with ID ${id} updated successfully`,
      chapter: updatedChapter,
    };
  }

  async remove(id: number) {
    const chapter = await this.chapterModel.findByPk(id);
    if (!chapter) {
      throw new NotFoundException(`Chapter with ID ${id} not found`);
    }

    await chapter.destroy();

    return {
      message: `Chapter with ID ${id} removed successfully`,
    };
  }
}
