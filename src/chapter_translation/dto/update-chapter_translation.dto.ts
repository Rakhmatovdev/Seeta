import { PartialType } from '@nestjs/swagger';
import { CreateChapterTranslationDto } from './create-chapter_translation.dto';

export class UpdateChapterTranslationDto extends PartialType(CreateChapterTranslationDto) {}
