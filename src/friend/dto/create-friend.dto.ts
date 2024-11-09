import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFriendDto {
  @ApiProperty({
    description: 'The ID of the first user',
    example: 1,
  })
  @IsInt({ message: 'user_id1 must be an integer' })
  @IsPositive({ message: 'user_id1 must be a positive number' })
  learner_id1: number;

  @ApiProperty({
    description: 'The ID of the second user',
    example: 2,
  })
  @IsInt({ message: 'user_id2 must be an integer' })
  @IsPositive({ message: 'user_id2 must be a positive number' })
  learner_id2: number;
}
