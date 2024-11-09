import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsEnum, IsPositive, Min, IsString } from 'class-validator';
import { Level } from './level-value.dto';

export class CreateChapterDto {
  @ApiProperty({
    description: 'ID of the language',
    example: 1,
    type: Number,
  })
  @IsInt({ message: 'langId must be an integer' })
  @IsPositive({ message: 'langId must be a positive number' })
  langId: number;

  @ApiProperty({
    description: 'The level of the chapter',
    enum: Level, 
  })
  @IsEnum(Level, { message: 'level must be a valid chapter level' })
  level: Level;

  @ApiProperty({
    description: 'The chapter number',
    example: 1,
    type: Number,
  })
  @IsInt({ message: 'chapter_number must be an integer' })
  @Min(1, { message: 'chapter_number must be at least 1' })
  chapter_number: number;

  @ApiProperty({
    description: 'The title of the chapter',
    example: 'Introduction to Basics',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'title should not be empty' })
  title: string;

  
}


