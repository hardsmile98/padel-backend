import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import {
  AddMatchDto,
  CreateCategoryDto,
  CreateGroupDto,
  CreateStageDto,
  CreateTeamDto,
  CreateTournamentDto,
  SetActiveStageDto,
} from './dtos';

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

  @Post(':id/:stageId/create-category')
  async createCategory(
    @Param('id') id: string,
    @Param('stageId') stageId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.tournamentsService.createCategory(
      id,
      stageId,
      createCategoryDto,
    );
  }

  @Post(':id/:stageId/:categoryId/create-group')
  async createGroup(
    @Param('id') id: string,
    @Param('stageId') stageId: string,
    @Param('categoryId') categoryId: string,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    return this.tournamentsService.createGroup(
      id,
      stageId,
      categoryId,
      createGroupDto,
    );
  }

  @Get('groups/:groupId')
  async getGroup(@Param('groupId') groupId: string) {
    return this.tournamentsService.getGroup(groupId);
  }

  @Post('groups/:groupId/create-team')
  async createTeam(
    @Param('groupId') groupId: string,
    @Body() createTeamDto: CreateTeamDto,
  ) {
    return this.tournamentsService.createTeam(groupId, createTeamDto);
  }

  @Post('teams/:teamId/delete')
  async deleteTeam(@Param('teamId') teamId: string) {
    return this.tournamentsService.deleteTeam(teamId);
  }

  @Post('groups/:groupId/create-match')
  async addMatch(
    @Param('groupId') groupId: string,
    @Body() addMatchDto: AddMatchDto,
  ) {
    return this.tournamentsService.addMatch(groupId, addMatchDto);
  }

  @Post('matches/:matchId/delete')
  async deleteMatch(@Param('matchId') matchId: string) {
    return this.tournamentsService.deleteMatch(matchId);
  }
}
