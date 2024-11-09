import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './models/language.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class LanguageService {
  constructor(@InjectModel(Language) private languageModel: typeof Language) {}

  async create(createLanguageDto: CreateLanguageDto) {
    return this.languageModel.create(createLanguageDto);
  }

  async findAll() {
    return this.languageModel.findAll();
  }

  async findOne(id: number) {
    const language = await this.languageModel.findByPk(id);
    if (!language) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }
    return language;
  }

  async findLanguageByName(name: string) {
    const language = await this.languageModel.findOne({ where: { name } });
    if (!language) {
      throw new NotFoundException(`Language with name ${name} not found`);
    }
    return language;
  }

  async update(
    id: number,
    updateLanguageDto: UpdateLanguageDto,
  ): Promise<Language> {
    const language = await this.findOne(id);
    await language.update(updateLanguageDto);
    return language;
  }

  async remove(id: number): Promise<void> {
    const language = await this.findOne(id);
    await language.destroy();
  }
}
