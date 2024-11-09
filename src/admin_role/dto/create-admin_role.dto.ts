import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAdminRoleDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'It is admin ID',
  })
  admin_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 2,
    description: 'It is role ID',
  })
  role_id: number;
}
