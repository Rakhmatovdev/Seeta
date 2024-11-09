import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friend } from './models/friend.model';

@Injectable()
export class FriendService {
  async create(createFriendDto: CreateFriendDto) {
    const friend = await Friend.create(createFriendDto);
    return {
      message: 'Friend relationship created successfully',
      friend,
    };
  }

  async findAll() {
    const friends = await Friend.findAll({ include: { all: true } });
    return {
      message: 'Successfully found all friends',
      friends,
    };
  }

  async findOne(id: number) {
    const friend = await Friend.findByPk(id);
    if (!friend) {
      throw new NotFoundException(
        `Friend relationship not found with id: ${id}`,
      );
    }
    return {
      message: 'Successfully retrieved friend relationship',
      friend,
    };
  }

  async update(id: number, updateFriendDto: UpdateFriendDto) {
    const friend = await Friend.findByPk(id);
    if (!friend) {
      throw new NotFoundException(
        `Friend relationship not found with id: ${id}`,
      );
    }
    await friend.update(updateFriendDto);
    return {
      message: 'Friend relationship updated successfully',
      friend,
    };
  }

  async remove(id: number) {
    const friend = await Friend.findByPk(id);
    if (!friend) {
      throw new NotFoundException(
        `Friend relationship not found with id: ${id}`,
      );
    }
    await friend.destroy();
    return {
      message: 'Friend relationship deleted successfully',
    };
  }
}
