import { Module } from '@nestjs/common';
import { LearnerProgressService } from './learner_progress.service';
import { LearnerProgressController } from './learner_progress.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LearnerProgress } from './models/learner_progress.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([LearnerProgress]),
    JwtModule.register({}),
  ],
  controllers: [LearnerProgressController],
  providers: [LearnerProgressService],
})
export class LearnerProgressModule {}
