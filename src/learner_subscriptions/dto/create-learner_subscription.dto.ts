import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLearnerSubscriptionDto {
  @ApiProperty({
    description: 'The unique identifier of the learner',
    type: Number,
  })
  @IsInt({ message: 'learner_id must be an integer' })
  @IsNotEmpty({ message: 'learner_id should not be empty' })
  learner_id: number;

  @ApiProperty({
    description: 'The unique identifier for the subscription type',
    type: Number,
  })
  @IsInt({ message: 'type_id must be an integer' })
  @IsNotEmpty({ message: 'type_id should not be empty' })
  type_id: number;

  @ApiProperty({
    description: 'The expiration date of the subscription in ISO format',
    type: String,
    format: 'date-time',
  })
  @IsDateString({}, { message: 'expire_date must be a valid date string' })
  @IsNotEmpty({ message: 'expire_date should not be empty' })
  expire_date: string;

  @ApiProperty({
    description: 'Indicates whether the subscription will auto-renew',
    type: Boolean,
    default: false,
  })
  @IsBoolean({ message: 'is_auto_renew must be a boolean' })
  @IsNotEmpty()
  is_auto_renew: boolean;
}
