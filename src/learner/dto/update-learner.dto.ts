import { PartialType } from '@nestjs/swagger';
import { CreateLearnerDto } from './create-learner.dto';

export class UpdateLearnerDto extends PartialType(CreateLearnerDto) {}
