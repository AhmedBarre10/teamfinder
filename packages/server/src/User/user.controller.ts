import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { get } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.schema';

@Injectable()
@Controller('auth')
export class UserController {
  constructor(
    @InjectModel('User') private readonly UserModule: Model<User>,
    private jwtService: JwtService,
  ) {}

  @Post()
  async addUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      let user = await this.UserModule.findOne({ email });
      let users = await this.UserModule.findOne({ email }).select(
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

      return this.jwtService.sign(payload);
    } catch (err) {
      return err;
    }
  }

  // @Get()
  // async getAllProducts() {
  //   const products = await this.infoService.getProducts();
  //   return products;
  // }

  // @Get(':id')
  // async getById(@Param('id') infoId: string) {
  //   const Info = await this.infoService.getSingleProduct(infoId);
  //   return Info;
  // }

  //   @Get(':id')
  //   getProduct(@Param('id') prodId: string) {
  //     return this.productsService.getSingleProduct(prodId);
  //   }

  // @Patch(':id')
  // async updateProduct(
  //   @Param('id') prodId: string,
  //   @Body('title') prodTitle: string,
  //   @Body('description') prodDesc: string,
  //   @Body('price') prodPrice: number,
  // ) {
  //   await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
  //   return null;
  // }

  // @Delete(':id')
  // async removeProduct(@Param('id') prodId: string) {
  //     await this.productsService.deleteProduct(prodId);
  //     return null;
  // }
}
