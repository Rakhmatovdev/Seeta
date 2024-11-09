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
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';  // Import JwtAuthGuard
import { SelfGuard } from '../common/guards/self.guard';  // Import SelfGuard if necessary

@ApiTags('Friends')
@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  // Create a new friend relationship
  @Post()
  @ApiOperation({ summary: 'Create a new friend relationship' })
  @ApiResponse({
    status: 201,
    description: 'The friend relationship has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @UseGuards(JwtAuthGuard)  // Only authenticated users can create a friend relationship
  create(@Body() createFriendDto: CreateFriendDto) {
    return this.friendService.create(createFriendDto);
  }

  // Get all friend relationships (could be restricted to the authenticated user only)
  @Get()
  @ApiOperation({ summary: 'Get all friend relationships' })
  @ApiResponse({
    status: 200,
    description: 'List of all friend relationships.',
  })
  @UseGuards(JwtAuthGuard)  // Only authenticated users can view friend relationships
  findAll() {
    return this.friendService.findAll();
  }

  // Get a friend relationship by ID (this should probably be restricted to the users involved in the friendship)
  @Get(':id')
  @ApiOperation({ summary: 'Get a friend relationship by ID' })
  @ApiResponse({
    status: 200,
    description: 'The friend relationship has been successfully found.',
  })
  @ApiResponse({ status: 404, description: 'Friend relationship not found.' })
  @UseGuards(JwtAuthGuard)  // Only authenticated users can view a friend relationship
  findOne(@Param('id') id: string) {
    return this.friendService.findOne(+id);
  }

  // Update a friend relationship (restricted to the users involved in the relationship)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a friend relationship by ID' })
  @ApiResponse({
    status: 200,
    description: 'The friend relationship has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Friend relationship not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @UseGuards(JwtAuthGuard, SelfGuard)  // Only the users involved in the friendship can update it
  update(@Param('id') id: string, @Body() updateFriendDto: UpdateFriendDto) {
    return this.friendService.update(+id, updateFriendDto);
  }

  // Delete a friend relationship (restricted to the users involved in the relationship)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a friend relationship by ID' })
  @ApiResponse({
    status: 200,
    description: 'The friend relationship has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Friend relationship not found.' })
  @UseGuards(JwtAuthGuard, SelfGuard)  // Only the users involved in the friendship can delete it
  remove(@Param('id') id: string) {
    return this.friendService.remove(+id);
  }
}

