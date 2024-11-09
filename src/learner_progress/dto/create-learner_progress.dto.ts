import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Level } from '../../chapters/dto/level-value.dto';
import { IsIn } from 'sequelize-typescript';

export class CreateLearnerProgressDto {
  @ApiProperty({ example: 1, description: 'ID of the learner' })
  @IsInt()
  @IsNotEmpty()
  learner_id: number;

  @ApiProperty({ example: 1, description: 'ID of the language being learned' })
  @IsInt()
  @IsNotEmpty()
  lesson_id: number;

  @ApiProperty({ example: 85.5, description: 'Fluency percentage of the learner' })
  @IsNumber()
  @Min(0)
  fluency: number;

  @ApiProperty({ example: 200, description: 'Number of words learned by the learner' })
  @IsInt()
  @Min(0)
  learned_words: number;

  @ApiProperty({ example: 5, description: 'Current level of the learner' })
  @IsNotEmpty()
  level: Level;

  @ApiProperty({ example: 10, description: 'Current daily streak of the learner' })
  @IsInt()
  @Min(0)
  daily_streak: number;

  @ApiProperty({
    example: '2024-10-29,2024-10-30',
    description: 'Comma-separated string of active days',
  })
  @IsNotEmpty()
  active_days: Weekdays;

  
}
export enum Weekdays {
  MONDAY = 'monday',
  THUESDAY = 'thuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = "saturday",
  SUNDAY = "sunday"
}
