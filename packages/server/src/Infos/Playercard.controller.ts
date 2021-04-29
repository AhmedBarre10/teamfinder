import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';

import { PlayercardService } from './Playercard.service';
import { Request } from '@nestjs/common';

@Controller('products')
export class PlayercardController {
  constructor(private readonly playercardService: PlayercardService) {}

  @Post()
  async addPlayercard(
    @Body('Archetype') Archetype: string,
    @Body('Winpercentage') Winpercentage: string,
    @Body('Overall') Overall: string,
    @Body('Rep') Rep: string,
    @Body('System') System: string,
    @Body('Position') Position: string,
    @Body('Type') Type: string,
    @Body('Status') Status: string,
    @Body('Gamertag') Gamertag: string,
    @Body('Bio') Bio: string,
    @Body('Twitter') Twitter: string,
    @Body('Youtube') Youtube: string,
    @Body('Instagram') Instagram: string,
    @Body('Twitch') Twitch: string,

    @Request() request,
  ) {
    const PlayerId = request.user.id;
    const generatedId = await this.playercardService.insertInfo(
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
    );

    return generatedId;
  }

  @Put(':id')
  async updatePlayerCard(
    @Body('Archetype') Archetype: string,
    @Body('Winpercentage') Winpercentage: string,
    @Body('Overall') Overall: string,
    @Body('Rep') Rep: string,
    @Body('System') System: string,
    @Body('Position') Position: string,
    @Body('Type') Type: string,
    @Body('Status') Status: string,
    @Body('Gamertag') Gamertag: string,
    @Body('Bio') Bio: string,
    @Body('Twitter') Twitter: string,
    @Body('Youtube') Youtube: string,
    @Body('Instagram') Instagram: string,
    @Body('Twitch') Twitch: string,
    @Request() request,
  ) {
    const PlayerId = request.user.id;

    const oldPlayerCard = request.user.id;

    return this.playercardService.updatePlayerCard(
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
    );
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
  @Get(':id')
  async getById(@Param('id') infoId: string) {
    const Info = await this.playercardService.findPlayerCard(infoId);
    return Info;
  }

  @Get('playerId/:id')
  async getByPlayerId(@Param('id') id: string) {
    return this.playercardService.findByPlayerId(id);
  }
}
