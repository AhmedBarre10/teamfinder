import {
  Injectable,
  NotFoundException,
  Inject,
  Scope,
  Req,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Playercards } from "./Playercard.schemas";
import { Request } from "@nestjs/common";
import { ConditionFunc } from "rxjs/internal/observable/generate";

@Injectable({ scope: Scope.REQUEST })
export class PlayercardService {
  constructor(
    @InjectModel("Playercards")
    private readonly PlayercardModel: Model<Playercards>
  ) {}

  async insertInfo(
    date: string,
    Team1: [
      Name: string,
      Logo: string,
      id: string,
      first: {
        name: string;
        points: string;
        assist: string;
        blocks: string;
        steals: string;
        rebounds: string;
        FG: string;
        TPT: string;
        id: string;
      },
      second: {
        name: string;
        Logo: string;
        points: string;
        assist: string;
        blocks: string;
        steals: string;
        rebounds: string;
        FG: string;
        TPT: string;
        id: string;
      },
      third: {
        name: string;
        Logo: string;
        points: string;
        assist: string;
        blocks: string;
        steals: string;
        rebounds: string;
        FG: string;
        TPT: string;
        id: string;
      }
    ],
    Team2: [
      Name: string,
      Logo: string,
      id: string,
      first: {
        name: string;
        points: string;
        assist: string;
        blocks: string;
        steals: string;
        rebounds: string;
        FG: string;
        TPT: string;
        id: string;
      },
      second: {
        name: string;
        Logo: string;
        points: string;
        assist: string;
        blocks: string;
        steals: string;
        rebounds: string;
        FG: string;
        TPT: string;
        id: string;
      },
      third: {
        name: string;
        Logo: string;
        points: string;
        assist: string;
        blocks: string;
        steals: string;
        rebounds: string;
        FG: string;
        TPT: string;
        id: string;
      }
    ]
  ) {
    try {
      const newPlayercard = new this.PlayercardModel({
        date,
        Team1,
        Team2,
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
    date: string,
    Team1: [
      Name: string,
      Logo: string,
      id: string,
      first: {
        name: string;
        points: string;
        assist: string;
        blocks: string;
        steals: string;
        rebounds: string;
        FG: string;
        TPT: string;
        id: string;
      },
      second: {
        name: string;
        Logo: string;
        points: string;
        assist: string;
        blocks: string;
        steals: string;
        rebounds: string;
        FG: string;
        TPT: string;
        id: string;
      },
      third: {
        name: string;
        Logo: string;
        points: string;
        assist: string;
        blocks: string;
        steals: string;
        rebounds: string;
        FG: string;
        TPT: string;
        id: string;
      }
    ],
    Team2: [
      Name: string,
      Logo: string,
      id: string,
      first: {
        name: string;
        points: string;
        assist: string;
        blocks: string;
        steals: string;
        rebounds: string;
        FG: string;
        TPT: string;
        id: string;
      },
      second: {
        name: string;
        Logo: string;
        points: string;
        assist: string;
        blocks: string;
        steals: string;
        rebounds: string;
        FG: string;
        TPT: string;
        id: string;
      },
      third: {
        name: string;
        Logo: string;
        points: string;
        assist: string;
        blocks: string;
        steals: string;
        rebounds: string;
        FG: string;
        TPT: string;
        id: string;
      }
    ]
  ) {
    const newPlayercard = new this.PlayercardModel({
      date,
      Team1,
      Team2,
    });
    // const id = "6192e8e8393c6cceb94e245a";
    // let oldPlayerCards = await this.PlayercardModel.findById(id);
    // console.log(oldPlayerCards);
    // const j = oldPlayerCards.Games;
    // const s = newPlayercard.Games;

    // const ob = {
    //   j,
    //   s,
    // };
    // oldPlayerCards.Name = newPlayercard.Name;
    // oldPlayerCards.Logo = newPlayercard.Logo;
    // oldPlayerCards.Games = newPlayercard.Games;
    // oldPlayerCards.Roster = newPlayercard.Roster;

    // const result = await oldPlayerCards.save();
    // return result;
  }

  // async findPlayerCard(id: string): Promise<Playercards> {
  //   let Info;
  //   try {
  //     Info = await this.PlayercardModel.find({
  //       PlayerId: id,
  //     }).exec();
  //     return Info;
  //   } catch (error) {
  //     throw new NotFoundException(error);
  //   }
  // }

  // async findByPlayerById(id) {
  //   try {
  //     const player = await this.PlayercardModel.findById(id);
  //     return player;
  //   } catch (error) {}
  // }

  // async delete(id) {
  //   try {
  //     const Player = await this.PlayercardModel.findById(id);
  //     return Player.deleteOne();
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // async findMe(id) {
  //   let Info;
  //   try {
  //     Info = await this.PlayercardModel.find({
  //       PlayerId: id,
  //     }).exec();
  //     return Info;
  //   } catch (error) {
  //     throw new NotFoundException(error);
  //   }
  // }
}
