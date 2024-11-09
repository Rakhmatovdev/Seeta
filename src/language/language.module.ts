import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Language } from './models/language.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Language]), JwtModule.register({})],
  controllers: [LanguageController],
  providers: [LanguageService],
})
export class LanguageModule {}
