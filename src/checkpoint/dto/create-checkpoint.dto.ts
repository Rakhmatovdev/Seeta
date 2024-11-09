import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateCheckpointDto {
  @ApiProperty({
    description: 'ID of the chapter this checkpoint belongs to',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  chapter_id: number;

  @ApiProperty({
    description: 'ID of the test associated with this checkpoint',
    example: 2,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  test_id: number;
}
