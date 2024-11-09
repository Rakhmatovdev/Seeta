import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateSubscriptionTypeDto {
  @ApiProperty({
    description: 'The name of the subscription type',
    example: 'Premium',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The price of the subscription type',
    example: 19.99,
  })
  @IsInt()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'The ID of the duration associated with the subscription type',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  duration_id: number;
}
