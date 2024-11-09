import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Friends')
@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new friend relationship' })
  @ApiResponse({
    status: 201,
    description: 'The friend relationship has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @UseGuards(JwtAuthGuard)
  create(@Body() createFriendDto: CreateFriendDto) {
    return this.friendService.create(createFriendDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all friend relationships' })
  @ApiResponse({
    status: 200,
    description: 'List of all friend relationships.',
  })
  findAll() {
    return this.friendService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a friend relationship by ID' })
  @ApiResponse({
    status: 200,
    description: 'The friend relationship has been successfully found.',
  })
  @ApiResponse({ status: 404, description: 'Friend relationship not found.' })
  findOne(@Param('id') id: string) {
    return this.friendService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a friend relationship by ID' })
  @ApiResponse({
    status: 200,
    description: 'The friend relationship has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Friend relationship not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  update(@Param('id') id: string, @Body() updateFriendDto: UpdateFriendDto) {
    return this.friendService.update(+id, updateFriendDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a friend relationship by ID' })
  @ApiResponse({
    status: 200,
    description: 'The friend relationship has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Friend relationship not found.' })
  remove(@Param('id') id: string) {
    return this.friendService.remove(+id);
  }
}
