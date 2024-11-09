import { Module } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CheckpointController } from './checkpoint.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Checkpoint } from './models/checkpoint.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Checkpoint]), JwtModule.register({})],
  controllers: [CheckpointController],
  providers: [CheckpointService],
})
export class CheckpointModule {}
