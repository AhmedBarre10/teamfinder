import {
  Injectable,
  NotFoundException,
  Inject,
  Scope,
  Req,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playercards } from './Playercard.schemas';
import { Request } from '@nestjs/common';
import { ConditionFunc } from 'rxjs/internal/observable/generate';

@Injectable({ scope: Scope.REQUEST })
export class PlayercardService {
  constructor(
    @InjectModel('Playercards')
    private readonly PlayercardModel: Model<Playercards>,
  ) {}

  async insertInfo(
    Archetype: string,
    Overall: string,
    Winpercentage: string,
    Rep: string,
    System: string,
    Type: string,
    Position: string,
    Status: string,
    Gamertag: string,
    Bio: string,
    Twitter: string,
    Youtube: string,
    Instagram: string,
    Twitch: string,
    PlayerId: String,
  ) {
    try {
      const newPlayercard = new this.PlayercardModel({
        Archetype,
        Overall,
        Winpercentage,
        Rep,
        System,
        Type,
        Position,
        Status,
        Gamertag,
        Bio,
        Twitter,
        Youtube,
        Instagram,
        Twitch,
        PlayerId,
      });

      const result = await newPlayercard.save();
      return result;
    } catch (err) {
      return err;
    }
  }

  async findPlayerCards() {
    try {
      const products = await this.PlayercardModel.find().exec();
      return products;
    } catch (err) {
      return err;
    }
  }

  async updatePlayerCard(
    Archetype: string,
    Overall: string,
    Winpercentage: string,
    Rep: string,
    System: string,
    Type: string,
    Position: string,
    Status: string,
    Gamertag: string,
    Bio: string,
    Twitter: string,
    Youtube: string,
    Instagram: string,
    Twitch: string,
    PlayerId: String,
    oldPlayerCard: string,
  ) {
    const newPlayercard = new this.PlayercardModel({
      Archetype,
      Overall,
      Winpercentage,
      Rep,
      System,
      Type,
      Position,
      Status,
      Gamertag,
      Bio,
      Twitter,
      Youtube,
      Instagram,
      Twitch,
      PlayerId,
      oldPlayerCard,
    });

    let oldPlayerCards = await this.PlayercardModel.findOne({
      PlayerId: oldPlayerCard,
    }).exec();
    oldPlayerCards.Overall = newPlayercard.Overall;

    const result = await oldPlayerCards.save();
    return result;
  }

  async findPlayerCard(id: string): Promise<Playercards> {
    let Info;
    try {
      Info = await this.PlayercardModel.findOne({
        PlayerId: id,
      }).exec();
    } catch (error) {
      throw new NotFoundException(error);
    }
    if (!Info) {
      throw new NotFoundException('Could not find product.');
    }
    return Info;
  }

  async findByPlayerId(id) {
    const player = await this.PlayercardModel.find({ PlayerId: id });
    return player;
  }
}
