import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Request as RequestInterface } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Request() req: RequestInterface,
  ) {
    const { access_token, user } = await this.authService.signup(createUserDto);

    req.headers.authorization = `Bearer ${access_token}`;

    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const { access_token } = await this.authService.login(req.user);

    req.headers.authorization = `Bearer ${access_token}`;

    return { message: 'OK' };
  }
}
