import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LearnerSubscriptionsService } from './learner_subscriptions.service';
import { CreateLearnerSubscriptionDto } from './dto/create-learner_subscription.dto';
import { UpdateLearnerSubscriptionDto } from './dto/update-learner_subscription.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Learner Subscriptions')
@Controller('learner-subscriptions')
export class LearnerSubscriptionsController {
  constructor(
    private readonly learnerSubscriptionsService: LearnerSubscriptionsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new learner subscription' })
  @ApiResponse({
    status: 201,
    description: 'The subscription has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createLearnerSubscriptionDto: CreateLearnerSubscriptionDto) {
    return this.learnerSubscriptionsService.create(
      createLearnerSubscriptionDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all learner subscriptions' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all subscriptions.',
  })
  @ApiResponse({ status: 404, description: 'No subscriptions found.' })
  findAll() {
    return this.learnerSubscriptionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a learner subscription by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the subscription.',
  })
  @ApiResponse({ status: 404, description: 'Subscription not found.' })
  findOne(@Param('id') id: string) {
    return this.learnerSubscriptionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a learner subscription' })
  @ApiResponse({
    status: 200,
    description: 'The subscription has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Subscription not found.' })
  update(
    @Param('id') id: string,
    @Body() updateLearnerSubscriptionDto: UpdateLearnerSubscriptionDto,
  ) {
    return this.learnerSubscriptionsService.update(
      +id,
      updateLearnerSubscriptionDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a learner subscription' })
  @ApiResponse({
    status: 200,
    description: 'The subscription has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Subscription not found.' })
  remove(@Param('id') id: string) {
    return this.learnerSubscriptionsService.remove(+id);
  }
}
