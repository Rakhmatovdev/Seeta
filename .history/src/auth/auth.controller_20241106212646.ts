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

  // @UseGuards(AdminCreatorGuard)
  @Post('signupAdmin')
  @ApiOperation({ summary: "Yangi admin qo'shish (is_creator yarata oladi)" })
  @ApiResponse({
    status: 201,
    description: 'Create Admin',
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
  @ApiOperation({ summary: 'Admin tizimga kirish' })
  @ApiResponse({
    status: 200,
    description: 'Admin signin',
    type: Admin,
  })
  async adminSignIn(@Body() adminSignInDto: SignInDto, @Res() res: Response) {
    return this.authService.adminSignIn(adminSignInDto, res);
  }

  @ApiOperation({ summary: "ma'lumotlarni tokenga o'zgartirish" })
  @Post('/refreshToken/:id')
  async refreshToken(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(id, refresh_token, res);
  }

  @Post('signoutAdmin/:id')
  @ApiOperation({ summary: 'Admin tizimdan chiqishi' })
  @ApiResponse({
    status: 200,
    description: 'Admin signout',
  })
  async adminSignOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
  ) {
    const refreshToken = req.cookies['refresh_token'];

    return this.authService.adminSignOut(refreshToken, res, +id);
  }

  //==================== LEARNER ===========================

  @Post('signupLearner')
  @ApiOperation({ summary: 'Add new Learner' })
  @ApiResponse({
    status: 201,
    description: 'Create Learner',
    type: Learner,
  })
  async learnerSignUp(
    @Body() createLearnerDto: CreateLearnerDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.learnerSignIn(createLearnerDto, res);
    return res.status(201).json(result);
  }

  @ApiOperation({ summary: 'The link to activate learner' })
  @Get('activate/:link')
  activateUser(@Param('link') link: string, @Res() res: Response) {
    return this.authService.activateLearner(link, res);
  }

  @Post('learner-signin')
  @ApiOperation({ summary: 'Owner tizimga kirish' })
  @ApiResponse({
    status: 200,
    description: 'Owner signin',
    type: Learner,
  })
  async ownerSignIn(@Body() ownerSignInDto: SignInDto, @Res() res: Response) {
    return this.authService.learnerSignIn(ownerSignInDto, res);
  }

  @Post('learner-signout/:id')
  @ApiOperation({ summary: 'Owner tizimdan chiqishi' })
  @ApiResponse({
    status: 200,
    description: 'Owner signout',
  })
  async ownerSignOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
  ) {
    const refreshToken = req.cookies['refresh_token'];

    return this.authService.learnerSignOut(refreshToken, res, +id);
  }
}
  