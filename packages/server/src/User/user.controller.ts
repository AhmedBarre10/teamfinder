import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Res, Req, Request } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import path = require('path');
import { join } from 'path';
import * as AWS from 'aws-sdk';

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

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

  @Put('upload')
  async create(@Req() request, @Res() response) {
    try {
      await this.userService.fileupload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }

  @Get('/images/:key')
  async getImages(@Param('key') key: string, @Req() req, @Res() res) {
    console.log(req.params);
    const readStream = await this.userService.getFileStream(key);
    readStream.pipe(res);
  }

  @Get('/getuser/:id')
  async getUsersById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('/getMe')
  async getMe(@Request() req) {
    const id = req.user.id;
    return this.userService.getMe(id);
  }
}
