import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDurationDto {

  @ApiProperty({
    description: 'The value of the duration (e.g., "1 month", "2 weeks")',
    example: '1 month', 
  })
  @IsString()
  @IsNotEmpty()
  duration_value: string;
}
