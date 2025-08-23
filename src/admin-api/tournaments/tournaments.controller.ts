import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateStageDto, CreateTournamentDto, SetActiveStageDto } from './dtos';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Get()
  async getTournaments() {
    return this.tournamentsService.getTournaments();
  }

  @Post('create')
  async createTournament(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentsService.createTournament(createTournamentDto);
  }

  @Post(':id/set-active')
  async changeTournamentStatus(@Param('id') id: string) {
    return this.tournamentsService.changeTournamentStatus(id);
  }

  @Get(':id')
  async getTournament(@Param('id') id: string) {
    return this.tournamentsService.getTournament(id);
  }

  @Post(':id/set-active-stage')
  async setActiveStage(
    @Param('id') id: string,
    @Body() setActiveStageDto: SetActiveStageDto,
  ) {
    return this.tournamentsService.setActiveStage(id, setActiveStageDto);
  }

  @Post(':id/create-stage')
  async createStage(
    @Param('id') id: string,
    @Body() createStageDto: CreateStageDto,
  ) {
    return this.tournamentsService.createStage(id, createStageDto);
  }
}
