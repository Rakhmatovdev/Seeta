import { Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { Chapter } from './models/chapter.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Chapter]), JwtModule.register({})],
  controllers: [ChaptersController],
  providers: [ChaptersService],
})
export class ChaptersModule {}
