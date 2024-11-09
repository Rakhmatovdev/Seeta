import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length, IsNotEmpty } from 'class-validator';

export class CreateChapterTranslationDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the chapter to which this translation belongs',
  })
  @IsInt({ message: 'chapter_id must be an integer' })
  chapter_id: number;

  @ApiProperty({
    example: 2,
    description: 'ID of the language for this translation',
  })
  @IsInt({ message: 'lang_id must be an integer' })
  lang_id: number;

  @ApiProperty({
    example: 'Introduction to Physics',
    description: 'Title of the chapter in the specified language',
  })
  @IsString({ message: 'title must be a string' })
  @IsNotEmpty({ message: 'title cannot be empty' })
  @Length(3, 100, { message: 'title must be between 3 and 100 characters' })
  title: string;

  @ApiProperty({
    example: 'This chapter introduces the fundamental concepts of physics...',
    description: 'Content of the chapter in the specified language',
  })
  @IsString({ message: 'content must be a string' })
  @IsNotEmpty({ message: 'content cannot be empty' })
  @Length(10, 5000, {
    message: 'content must be between 10 and 5000 characters',
  })
  content: string;
}
