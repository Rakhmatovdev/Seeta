import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ example: "ADMIN", description: "Adding roles" })
  @IsString({ message: "Must be string" })
  @IsNotEmpty()
  role_name: string;

  @ApiProperty({
    example: "Admin role infos",
    description: "It is written here full info of Admin",
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
