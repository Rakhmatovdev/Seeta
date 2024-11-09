

import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonDto {
  @ApiProperty({
    description: 'The ID of the chapter to which the lesson belongs',
  })
  @IsInt({ message: 'chapter_id must be an integer' })
  chapter_id: number;

  @ApiProperty({ description: 'The number of the lesson' })
  @IsInt({ message: 'lesson_number must be an integer' })
  lesson_number: number;

  @ApiProperty({ description: 'The title of the lesson' })
  @IsString({ message: 'title must be a string' })
  @IsNotEmpty({ message: 'title cannot be empty' })
  title: string;

  @ApiProperty({ description: 'The content of the lesson' })
  @IsString({ message: 'content must be a string' })
  @IsNotEmpty({ message: 'content cannot be empty' })
  content: string;


}

