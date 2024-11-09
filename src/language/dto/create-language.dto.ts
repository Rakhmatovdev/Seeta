import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLanguageDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Uzbek',
    description: 'Language name here',
  })
  name: string;
}
