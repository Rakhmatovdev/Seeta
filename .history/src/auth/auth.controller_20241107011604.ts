import {
  Controller,
  Post,
  Body,
  Res,
  Param,
  HttpStatus,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Admin } from '../admin/models/admin.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { AdminService } from '../admin/admin.service';
import { Response, Request } from 'express';
import { SignInDto } from './dto/admin-signin.dto';
import { CookieGetter } from '../common/decorators/cookieGetter.decorator';
import { AdminCreatorGuard } from '../common/guards/admin_creator.guard';
import { Learner } from '../learner/models/learner.model';
import { CreateLearnerDto } from '../learner/dto/create-learner.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ======================= ADMIN ==========================

  @Post('signupAdmin')
  @ApiOperation({
    summary: 'Create a new admin (only admin creator can create)',
  })
  @ApiResponse({
    status: 201,
    description: 'Admin successfully created',
    type: Admin,
  })
  async adminSignUp(
    @Body() createAdminDto: CreateAdminDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.adminSignUp(createAdminDto, res);
    return res.status(201).json(result);
  }

  @Post('signinAdmin')
  @ApiOperation({ summary: 'Admin login' })
  @ApiResponse({
    status: 200,
    description: 'Admin successfully logged in',
    type: Admin,
  })
  async adminSignIn(@Body() adminSignInDto: SignInDto, @Res() res: Response) {
    return this.authService.adminSignIn(adminSignInDto, res);
  }

  @Post('refreshTokenAdmin/:id')
  @ApiOperation({ summary: 'Refresh admin token using refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Successfully refreshed admin token',
  })
  async refreshToken(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(id, refresh_token, res);
  }

  @Post('signoutAdmin/:id')
  @ApiOperation({ summary: 'Admin logout and revoke refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Admin successfully logged out',
  })
  async adminSignOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    return this.authService.adminSignOut(refreshToken, res, +id);
  }

  // ======================= LEARNER =========================

  @Post('signupLearner')
  @ApiOperation({ summary: 'Create a new learner' })
  @ApiResponse({
    status: 201,
    description: 'Learner successfully created',
    type: Learner,
  })
  async learnerSignUp(
    @Body() createLearnerDto: CreateLearnerDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.learnerSignUp(createLearnerDto, res);
    return res.status(201).json(result);
  }

  @Get('activate/:link')
  @ApiOperation({ summary: 'Activate the learner account using a link' })
  @ApiResponse({
    status: 200,
    description: 'Learner account successfully activated',
  })
  activateLearner(@Param('link') link: string, @Res() res: Response) {
    return this.authService.activateLearner(link, res);
  }

  @Post('signinLearner')
  @ApiOperation({ summary: 'Learner login' })
  @ApiResponse({
    status: 200,
    description: 'Learner successfully logged in',
    type: Learner,
  })
  async learnerSignIn(
    @Body() learnerSignInDto: SignInDto,
    @Res() res: Response,
  ) {
    return this.authService.learnerSignIn(learnerSignInDto, res);
  }

  @Post('signoutLearner/:id')
  @ApiOperation({ summary: 'Learner logout and revoke refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Learner successfully logged out',
  })
  async learnerSignOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    return this.authService.learnerSignOut(refreshToken, res, +id);
  }

  @Post('refreshTokenLearner/:id')
  @ApiOperation({ summary: 'Refresh learner token using refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Successfully refreshed learner token',
  })
  async refreshTokenLearner(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshTokenLearner(id, refresh_token, res);
  }
}
