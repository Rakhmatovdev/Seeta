import { PartialType } from '@nestjs/swagger';
import { CreateDurationDto } from './create-duration.dto';

export class UpdateDurationDto extends PartialType(CreateDurationDto) {}
