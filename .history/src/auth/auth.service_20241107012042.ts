import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from '../admin/models/admin.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { Response } from 'express';
import { SignInDto } from './dto/admin-signin.dto';

import { Learner } from '../learner/models/learner.model';
import { CreateLearnerDto } from '../learner/dto/create-learner.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
    @InjectModel(Learner) private learnerModel: typeof Learner,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  // ====================== ADMIN ======================
  
  async generateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
        expiresIn: process.env.ADMIN_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
        expiresIn: process.env.ADMIN_REFRESH_TOKEN_TIME,
      }),
    ]);

    return { access_token, refresh_token };
  }

  async refreshToken(id: number, refresh_token: string, res: Response) {
    try {
      const verified_token = await this.jwtService.verify(refresh_token, {
        secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
      });
      if (!verified_token) {
        throw new UnauthorizedException('Unauthorized token');
      }
      if (id != verified_token.id) {
        throw new ForbiddenException('Forbidden user');
      }
      const payload = { id: verified_token.id, login: verified_token.login };
      const token = this.jwtService.sign(payload, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
        expiresIn: process.env.ADMIN_ACCESS_TOKEN_TIME,
      });
      return {
        token,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async adminSignUp(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminModel.findOne({
      where: { email: createAdminDto.email },
    });

    if (admin) {
      throw new BadRequestException('An admin with this email already exists');
    }

    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });
    const tokens = await this.generateToken(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedAdmin = await this.adminModel.update(
      { hashed_refresh_token },
      { where: { id: newAdmin.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.ADMIN_REFRESH_TIME_MS,
    });

    return {
      message: "Admin successfully registered",
      admin: updatedAdmin[1][0],
      access_token: tokens.access_token,
    };
  }

  async adminSignIn(adminSignInDto: SignInDto, res: Response) {
    const { email, password } = adminSignInDto;
    const admin = await this.adminModel.findOne({
      where: { email },
    });

    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }

    const validPassword = await bcrypt.compare(password, admin.hashed_password);
    if (!validPassword) {
      throw new UnauthorizedException('Incorrect password');
    }

    const tokens = await this.generateToken(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.ADMIN_REFRESH_TIME_MS,
    });

    await this.adminModel.update(
      { is_active: true, hashed_refresh_token },
      { where: { email: email } },
    );
    return res.json({
      message: 'Successfully logged in',
      access_token: tokens.access_token,
    });
  }

  async adminSignOut(refreshToken: string, res: Response, id: number) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
      });

      const admin = await this.adminModel.findOne({
        where: { id: payload.id },
      });
      if (!admin) {
        throw new UnauthorizedException('Admin not found');
      }

      if (Number(id) !== Number(admin.id)) {
        throw new BadRequestException('Invalid id or token');
      }

      const valid_refresh_token = await bcrypt.compare(
        refreshToken,
        admin.hashed_refresh_token,
      );
      if (!valid_refresh_token) {
        throw new UnauthorizedException('Error with the request');
      }

      res.clearCookie('refresh_token', {
        httpOnly: true,
      });

      await this.adminModel.update(
        { hashed_refresh_token: '', is_active: false },
        { where: { id: payload.id } },
      );

      return { message: 'Admin successfully signed out', id: payload.id };
    } catch (error) {
      throw new BadRequestException('Internal server error');
    }
  }

  // ======================= LEARNER ========================

  async generateTokenLearner(learner: Learner) {
    const payload = {
      id: learner.id,
      email: learner.email,
      is_active: learner.is_active,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.LEARNER_ACCESS_TOKEN_KEY,
        expiresIn: process.env.LEARNER_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.LEARNER_REFRESH_TOKEN_KEY,
        expiresIn: process.env.LEARNER_REFRESH_TOKEN_TIME,
      }),
    ]);

    return { access_token, refresh_token };
  }

  async learnerSignUp(createLearnerDto: CreateLearnerDto, res: Response) {
    const learner = await this.learnerModel.findOne({
      where: { email: createLearnerDto.email },
    });

    if (learner) {
      throw new BadRequestException('A learner with this email already exists');
    }

    if (createLearnerDto.password !== createLearnerDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashed_password = await bcrypt.hash(createLearnerDto.password, 7);
    const newLearner = await this.learnerModel.create({
      ...createLearnerDto,
      hashed_password,
    });
    const tokens = await this.generateTokenLearner(newLearner);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const activation_link = uuid.v4();
    const updatedLearner = await this.learnerModel.update(
      { hashed_refresh_token, activation_link },
      { where: { id: newLearner.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.LEARNER_REFRESH_TIME_MS,
    });

    try {
      await this.mailService.sendMail(updatedLearner[1][0]);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        console.log(error),
        'Error sending email to learner',
      );
    }

    const response = {
      message:
        'Learner has been successfully added! Please check your email to activate your account.',
      owner: updatedLearner[1][0],
      access_token: tokens.access_token,
    };

    return response;
  }

  async activateLearner(link: string, res: Response) {
    try {
      const learner = await this.learnerModel.findOne({
        where: { activation_link: link },
      });

      if (!learner) {
        return res
          .status(400)
          .send({ message: 'Learner not found during activation' });
      }

      if (learner.is_active) {
        return res
          .status(400)
          .send({ message: 'Learner account is already activated' });
      }

      learner.is_active = true;
      await learner.save();

      res.send({
        is_active: learner.is_active,
        message: 'Learner account successfully activated',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async learnerSignIn(learnerSignDto: SignInDto, res: Response) {
    const { email, password } = learnerSignDto;
    const learner = await this.learnerModel.findOne({
      where: { email },
    });

    if (!learner) {
      throw new UnauthorizedException('Learner not found');
    }

    const validPassword = await bcrypt.compare(
      password,
      learner
    }