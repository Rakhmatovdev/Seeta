import { Module } from '@nestjs/common';
import { ChapterTranslationService } from './chapter_translation.service';
import { ChapterTranslationController } from './chapter_translation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChapterTranslation } from './models/chapter_translation.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([ChapterTranslation]),
    JwtModule.register({}),
  ],
  controllers: [ChapterTranslationController],
  providers: [ChapterTranslationService],
})
export class ChapterTranslationModule {}
