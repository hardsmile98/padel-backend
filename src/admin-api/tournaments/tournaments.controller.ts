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
  UpdateMatchDto,
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

  @Post('stages/:stageId/delete')
  async deleteStage(@Param('stageId') stageId: string) {
    return this.tournamentsService.deleteStage(stageId);
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

  @Post('categories/:categoryId/delete')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    return this.tournamentsService.deleteCategory(categoryId);
  }

  @Post(':id/:stageId/create-group')
  async createGroup(
    @Param('id') id: string,
    @Param('stageId') stageId: string,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    return this.tournamentsService.createGroup(id, stageId, createGroupDto);
  }

  @Post('groups/:groupId/delete')
  async deleteGroup(@Param('groupId') groupId: string) {
    return this.tournamentsService.deleteGroup(groupId);
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

  @Post('categories/:categoryId/create-team')
  async createTeamByCategory(
    @Param('categoryId') categoryId: string,
    @Body() createTeamDto: CreateTeamDto,
  ) {
    return this.tournamentsService.createTeamByCategory(
      categoryId,
      createTeamDto,
    );
  }

  @Get('categories/:categoryId/teams')
  async getCategoryTeams(@Param('categoryId') categoryId: string) {
    return this.tournamentsService.getCategoryTeams(categoryId);
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

  @Post('matches/update')
  async updateMatch(@Body() updateMatchDto: UpdateMatchDto) {
    return this.tournamentsService.updateMatch(updateMatchDto);
  }

  @Post('matches/:matchId/delete')
  async deleteMatch(@Param('matchId') matchId: string) {
    return this.tournamentsService.deleteMatch(matchId);
  }
}
