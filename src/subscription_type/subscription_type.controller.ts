import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscriptionTypeService } from './subscription_type.service';
import { CreateSubscriptionTypeDto } from './dto/create-subscription_type.dto';
import { UpdateSubscriptionTypeDto } from './dto/update-subscription_type.dto';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SubscriptionType } from './models/subscription_type.model'; // Adjust according to your model's location

@ApiTags('Subscription Types')
@Controller('subscription-type')
export class SubscriptionTypeController {
  constructor(
    private readonly subscriptionTypeService: SubscriptionTypeService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The subscription type has been successfully created.',
    type: SubscriptionType,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createSubscriptionTypeDto: CreateSubscriptionTypeDto) {
    return this.subscriptionTypeService.create(createSubscriptionTypeDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retrieved all subscription types.',
    type: [SubscriptionType],
  })
  findAll() {
    return this.subscriptionTypeService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the subscription type to retrieve.',
  })
  @ApiResponse({
    status: 200,
    description: 'The subscription type has been successfully retrieved.',
    type: SubscriptionType,
  })
  @ApiResponse({ status: 404, description: 'Subscription type not found.' })
  findOne(@Param('id') id: string) {
    return this.subscriptionTypeService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the subscription type to update.',
  })
  @ApiResponse({
    status: 200,
    description: 'The subscription type has been successfully updated.',
    type: SubscriptionType,
  })
  @ApiResponse({ status: 404, description: 'Subscription type not found.' })
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionTypeDto: UpdateSubscriptionTypeDto,
  ) {
    return this.subscriptionTypeService.update(+id, updateSubscriptionTypeDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the subscription type to delete.',
  })
  @ApiResponse({
    status: 204,
    description: 'The subscription type has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Subscription type not found.' })
  remove(@Param('id') id: string) {
    return this.subscriptionTypeService.remove(+id);
  }
}
