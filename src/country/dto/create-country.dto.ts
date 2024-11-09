import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCountryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Uzbekistan',
    description: 'Country name here',
  })
  name: string;
}
