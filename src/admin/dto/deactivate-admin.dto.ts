import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeactivateAdminDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'The ID of the admin to deactivate',
  })
  readonly adminId: number;
}
