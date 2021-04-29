import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.userService.addUser(email, password);
  }

  @Post('signup')
  async signup(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.userService.signup(email, password, name);
  }

  @Get()
  async getUserss() {
    const users = await this.userService.getUsers();

    return users;
  }

  @Put('reset')
  async resetPassword(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.userService.resetPassword(email, password);
  }
}
