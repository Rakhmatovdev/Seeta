import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Friend } from './models/friend.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Friend]), JwtModule.register({})],
  controllers: [FriendController],
  providers: [FriendService],
})
export class FriendModule {}
