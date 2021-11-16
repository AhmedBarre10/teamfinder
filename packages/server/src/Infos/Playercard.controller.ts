import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Req,
} from "@nestjs/common";

import { PlayercardService } from "./Playercard.service";
import { Request } from "@nestjs/common";

@Controller("playercards")
export class PlayercardController {
  constructor(private readonly playercardService: PlayercardService) {}

  @Post()
  async addPlayercard(
    @Body("date")
    date: string,

    @Body("Team1")
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

    @Body("Team2")
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
    ],

    @Request() request
  ) {
    // const PlayerId = request.user.id;
    // if (PlayerId !== request.user.id) {
    //   return null;
    // }

    const generatedId = await this.playercardService.insertInfo(
      date,
      Team1,
      Team2
    );

    return generatedId;
  }

  @Put()
  async updatePlayerCard(
    @Body("date")
    date: string,

    @Body("Team1")
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

    @Body("Team2")
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
    ],
    @Request() request
  ) {
    return this.playercardService.updatePlayerCard(date, Team1, Team2);
  }

  @Get()
  async getAllProducts() {
    const products = await this.playercardService.findPlayerCards();
    return products;
  }

  // @Post('testPost')
  // async testPost(@Request() request) {
  //   console.log(request.user);
  // }
  // @Get("findbyid/:id")
  // async getById(@Param("id") infoId: string) {
  //   const Info = await this.playercardService.findByPlayerById(infoId);
  //   return Info;
  // }

  // @Get("playerId/:id")
  // async getByPlayerId(@Param("id") id: string) {
  //   return this.playercardService.findPlayerCard(id);
  // }

  // @Delete("/myplayers/:id")
  // async deletePlayerCard(@Param("id") id: string) {
  //   this.playercardService.delete(id);
  // }
  // @Get("/myplayers")
  // async getMe(@Request() request) {
  //   const player = request.user.id;
  //   return this.playercardService.findMe(player);
  // }
}
