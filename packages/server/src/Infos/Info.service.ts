import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Info } from './info.schemas';

@Injectable()
export class InfoService {
  constructor(@InjectModel('Info') private readonly InfoModule: Model<Info>) {}

  async insertInfo(
    Archetype: string,
    Overall: string,
    Player: string,
    Winpercentage: string,
    Rep: string,
    System: string,
    Type: string,
    Status: string,
    Gamertag: string,
    Bio: string,
    Twitter: string,
    Youtube: string,
    Instagram: string,
    Twitch: string,
  ) {
    const newInfo = new this.InfoModule({
      Archetype,
      Overall,
      Player,
      Winpercentage,
      Rep,
      System,
      Type,
      Status,
      Gamertag,
      Bio,
      Twitter,
      Youtube,
      Instagram,
      Twitch,
    });
    const result = await newInfo.save();
    return result;
  }

  async getProducts() {
    const products = await this.InfoModule.find().exec();
    return products;
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return product;
  }

  //   async updateProduct(
  //     productId: string,
  //     title: string,
  //     desc: string,
  //     price: number,
  //   ) {
  //     const updatedProduct = await this.findProduct(productId);
  //     if (title) {
  //       updatedProduct.title = title;
  //     }
  //     if (desc) {
  //       updatedProduct.description = desc;
  //     }
  //     if (price) {
  //       updatedProduct.price = price;
  //     }
  //     updatedProduct.save();
  //   }

  //   async deleteProduct(prodId: string) {
  //     const result = await this.productModel.deleteOne({_id: prodId}).exec();
  //     if (result.n === 0) {
  //       throw new NotFoundException('Could not find product.');
  //     }
  //   }

  private async findProduct(id: string): Promise<Info> {
    let Info;
    try {
      Info = await this.InfoModule.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!Info) {
      throw new NotFoundException('Could not find product.');
    }
    return Info;
  }
}
