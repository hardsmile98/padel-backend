import { Controller, Get, Param } from '@nestjs/common';
import { FrontService } from './front.service';
import { Public } from 'src/common/decorators';

@Public()
@Controller('common')
export class FrontController {
  constructor(private readonly frontService: FrontService) {}

  @Get('get-players')
  async getPlayers() {
    return this.frontService.getPlayers();
  }

  @Get('get-player-by-slug/:slug')
  async getPlayerBySlug(@Param('slug') slug: string) {
    return this.frontService.getPlayerBySlug(slug);
  }

  @Get('tournaments/players')
  async getTournamentPlayers() {
    return this.frontService.getTournamentPlayers();
  }

  @Get('tournaments/active')
  async getActiveTournament() {
    return this.frontService.getActiveTournament();
  }

  @Get('tournaments/groups/:groupId')
  async getGroupStatistics(@Param('groupId') groupId: string) {
    return this.frontService.getGroupStatistics(groupId);
  }
}
