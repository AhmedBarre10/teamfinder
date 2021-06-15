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
    id: string,
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
    });

    let oldPlayerCards = await this.PlayercardModel.findById(id);
    oldPlayerCards.Bio = newPlayercard.Bio;
    oldPlayerCards.Archetype = newPlayercard.Archetype;
    oldPlayerCards.Overall = newPlayercard.Overall;
    oldPlayerCards.Winpercentage = newPlayercard.Winpercentage;
    oldPlayerCards.Rep = newPlayercard.Rep;
    oldPlayerCards.System = newPlayercard.System;
    oldPlayerCards.Position = newPlayercard.Position;
    oldPlayerCards.Gamertag = newPlayercard.Gamertag;
    oldPlayerCards.Twitter = newPlayercard.Twitter;
    oldPlayerCards.Instagram = newPlayercard.Instagram;
    oldPlayerCards.Twitch = newPlayercard.Twitch;
    oldPlayerCards.PlayerId = newPlayercard.PlayerId;

    const result = await oldPlayerCards.save();
    return result;
  }

  async findPlayerCard(id: string): Promise<Playercards> {
    let Info;
    try {
      Info = await this.PlayercardModel.find({
        PlayerId: id,
      }).exec();
      return Info;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findByPlayerById(id) {
    try {
      const player = await this.PlayercardModel.findById(id);
      return player;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const Player = await this.PlayercardModel.findById(id);
      return Player.deleteOne();
    } catch (error) {
      return error;
    }
  }

  async findMe(id) {
    let Info;
    try {
      Info = await this.PlayercardModel.find({
        PlayerId: id,
      }).exec();
      return Info;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
