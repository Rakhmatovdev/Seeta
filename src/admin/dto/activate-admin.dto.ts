import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ActivateAdminDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'ID of the admin to activate',
  })
  readonly adminId: number;
}
