import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerDto } from './dtos';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async getPlayers() {
    return this.playersService.getPlayers();
  }

  @Get(':id')
  async getPlayer(@Param('id') id: string) {
    return this.playersService.getPlayer(id);
  }

  @Post(':id/delete')
  async deletePlayer(@Param('id') id: string) {
    return this.playersService.deletePlayer(id);
  }

  @Post('create')
  async createPlayer(@Body() createPlayerDto: PlayerDto) {
    return this.playersService.createPlayer(createPlayerDto);
  }

  @Post(':id/update')
  async updatePlayer(
    @Param('id') id: string,
    @Body() updatePlayerDto: PlayerDto,
  ) {
    return this.playersService.updatePlayer(id, updatePlayerDto);
  }
}
