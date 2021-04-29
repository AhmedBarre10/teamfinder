import { Body, Req } from '@nestjs/common';
import { get } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from '@nestjs/common';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    private jwt: JwtService,
  ) {}

  async addUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      let user = await this.UserModel.findOne({ email });
      let users = await this.UserModel.findOne({ email }).select(
        '-password -_id -date -__v ',
      );

      if (!user) {
        return 'Invalid Credentials';
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return 'Invalid Credentials';
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      return this.jwt.sign(payload);
    } catch (err) {
      return err;
    }
  }

  async getUsers() {
    const users = await this.UserModel.find().exec();

    return users;
  }

  async signup(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      let user = await this.UserModel.findOne({ email });

      if (user) {
        return 'User already exists';
      }

      user = new this.UserModel({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      console.log('saved');

      const payload = {
        user: {
          id: user.id,
        },
      };

      return this.jwt.sign(payload);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async resetPassword(@Body() email: string, @Body() newPassword: string) {
    const user = await this.UserModel.findOne({ email });
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);
    await user.update();
    return user;
  }
}
