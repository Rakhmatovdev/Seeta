import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsNotEmpty,
  IsBoolean,
  MinLength,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLearnerDto {
  @ApiProperty({
    description: 'Full name of the learner',
    example: 'Sitora Rashidova',
  })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({
    description: 'Nickname of the learner',
    required: false,
    example: 'Sitarajan',
  })
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiProperty({
    description: 'Profile photo URL',
    required: false,
    example: 'http://example.com/photo.jpg',
  })
  @IsString()
  @IsOptional()
  profile_photo?: string;

  @ApiProperty({
    description: 'Phone number of the learner',
    required: false,
    example: '+998904567890',
  })
  @IsPhoneNumber(null)
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: 'Native language ID', example: 1 })
  @IsNotEmpty()
  native_lang_id: number;

  @ApiProperty({ description: 'Country ID', example: 100 })
  @IsNotEmpty()
  country_id: number;

  @ApiProperty({
    description: 'Email address of the learner',
    example: 'sitarajan@example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the learner',
    example: 'Sitora123',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Confirm password of the learner',
    example: 'Sitora123',
  })
  @IsString()
  @MinLength(6)
  confirm_password: string;

  @ApiProperty({ description: 'Provider ID', example: 2 })
  @IsNotEmpty()
  provider_id: number;

  @ApiProperty({ description: 'Active status of the learner', example: true })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: 'JKfdskfb;fqwgkjgd',
    description: 'Hashed refresh token',
  })
  hashed_refresh_token?: string;
}

export class ActivateLearnerDto {
  @ApiProperty({ description: 'ID of the learner to activate', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  learnerId: number;
}

export class DeactivateLearnerDto {
  @ApiProperty({ description: 'ID of the learner to deactivate', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  learnerId: number;
}