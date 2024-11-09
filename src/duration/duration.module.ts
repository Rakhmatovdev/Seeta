import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Duration } from './models/duration.model'; 
import { DurationService } from './duration.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [SequelizeModule.forFeature([Duration]), JwtModule.register({})],
  providers: [DurationService],
  exports: [DurationService],
})
export class DurationModule {}
