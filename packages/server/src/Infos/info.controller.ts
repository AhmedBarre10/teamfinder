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

import { InfoService } from './info.service';

@Controller('products')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post()
  async addPlayercard(
    @Body('Archetype') Archetype: string,
    @Body('Player') Player: string,
    @Body('Overall') Overall: string,
    @Body('Winpercentage') Winpercentage: string,
    @Body('Rep') Rep: string,
    @Body('System') System: string,
    @Body('Type') Type: string,
    @Body('Status') Status: string,
    @Body('Gamertag') Gamertag: string,
    @Body('Bio') Bio: string,
    @Body('Twitter') Twitter: string,
    @Body('Youtube') Youtube: string,
    @Body('Instagram') Instagram: string,
    @Body('Twitch') Twitch: string,
  ) {
    const generatedId = await this.infoService.insertInfo(
      Archetype,
      Player,
      Overall,
      Winpercentage,
      Rep,
      System,
      Type,
      Status,
      Gamertag,
      Bio,
      Twitch,
      Twitter,
      Youtube,
      Instagram,
    );
    return generatedId;
  }

  @Get()
  async getAllProducts() {
    const products = await this.infoService.getProducts();
    return products;
  }

  @Get(':id')
  async getById(@Param('id') infoId: string) {
    const Info = await this.infoService.getSingleProduct(infoId);
    return Info;
  }

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
