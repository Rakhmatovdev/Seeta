import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  minLength,
} from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Super Admin',
    description: 'It is admin name',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'admin.png',
    description: 'It is admin profile photo',
  })
  profile_photo: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'superadmin@gmail.com',
    description: 'It is admin email address',
  })
  email: string;

  @ApiProperty({
    example: 'dsdkfj123456fghkn5456dfjgk',
    description: 'It is a hashed password',
  })
  @MinLength(8)
  @MaxLength(20)
  @IsString()
  password: string;

  @MinLength(8)
  @MaxLength(20)
  @IsString()
  @ApiProperty({
    example: 'dsdkfj123456fghkn5456dfjgk',
    description: 'It is a hashed password',
  })
  confirm_password: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: 'true',
    description: 'Admin activation',
  })
  is_active: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: 'true',
    description: 'It means admin creator or not',
  })
  is_creator: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'JKfdskfb;fqwgkjgd',
    description: 'Hashed refresh token',
  })
  hashed_refresh_token?: string;
}
