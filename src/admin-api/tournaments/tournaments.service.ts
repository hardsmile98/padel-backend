import {
  categories,
  groups,
  matches,
  players,
  stages,
  teams,
  tournaments,
} from 'src/common/db/schema';
import { DbService } from '../../common/db';
import { Injectable } from '@nestjs/common';
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
import { asc, desc, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';

@Injectable()
export class TournamentsService {
  constructor(private readonly dbService: DbService) {}

  async getTournaments() {
    const allTournaments = await this.dbService.db
      .select()
      .from(tournaments)
      .orderBy(desc(tournaments.createdAt));

    return allTournaments;
  }

  async createTournament(createTournamentDto: CreateTournamentDto) {
    const newTournament = await this.dbService.db
      .insert(tournaments)
      .values(createTournamentDto)
      .returning();

    return newTournament;
  }

  async changeTournamentStatus(id: string) {
    await this.dbService.db.update(tournaments).set({ isActive: false });

    await this.dbService.db
      .update(tournaments)
      .set({ isActive: true })
      .where(eq(tournaments.id, +id));
  }

  async createStage(id: string, createStageDto: CreateStageDto) {
    await this.dbService.db
      .insert(stages)
      .values({ ...createStageDto, tournamentId: +id })
      .execute();

    return { message: 'Этап создан' };
  }

  async getTournament(id: string) {
    const [tournament] = await this.dbService.db
      .select()
      .from(tournaments)
      .where(eq(tournaments.id, +id));

    const allStages = await this.dbService.db
      .select()
      .from(stages)
      .where(eq(stages.tournamentId, +id))
      .orderBy(asc(stages.order));

    const allCategories = await this.dbService.db
      .select()
      .from(categories)
      .where(eq(categories.tournamentId, +id))
      .orderBy(asc(categories.order));

    const allGroups = await this.dbService.db
      .select()
      .from(groups)
      .where(eq(groups.tournamentId, +id))
      .orderBy(asc(groups.createdAt));

    return {
      tournament,
      stages: allStages,
      categories: allCategories,
      groups: allGroups,
    };
  }

  async setActiveStage(id: string, setActiveStageDto: SetActiveStageDto) {
    await this.dbService.db
      .update(tournaments)
      .set({ currentStageId: setActiveStageDto.stageId })
      .where(eq(tournaments.id, +id));
  }

  async createCategory(
    id: string,
    stageId: string,
    createCategoryDto: CreateCategoryDto,
  ) {
    await this.dbService.db
      .insert(categories)
      .values({ ...createCategoryDto, tournamentId: +id, stageId: +stageId })
      .execute();

    return { message: 'Категория создана' };
  }

  async createGroup(
    id: string,
    stageId: string,
    createGroupDto: CreateGroupDto,
  ) {
    await this.dbService.db
      .insert(groups)
      .values({
        ...createGroupDto,
        tournamentId: +id,
        stageId: +stageId,
        categoryId: createGroupDto.categoryId
          ? +createGroupDto.categoryId
          : null,
      })
      .execute();

    return { message: 'Группа создана' };
  }

  async getGroup(groupId: string) {
    const [group] = await this.dbService.db
      .select()
      .from(groups)
      .where(eq(groups.id, +groupId))
      .orderBy(asc(groups.createdAt));

    const player1 = alias(players, 'player1');
    const player2 = alias(players, 'player2');

    const allTeams = await this.dbService.db
      .select({
        id: teams.id,
        player1Id: teams.player1Id,
        player2Id: teams.player2Id,
        player1: player1,
        player2: player2,
        createdAt: teams.createdAt,
      })
      .from(teams)
      .where(eq(teams.groupId, +groupId))
      .innerJoin(player1, eq(teams.player1Id, player1.id))
      .innerJoin(player2, eq(teams.player2Id, player2.id))
      .orderBy(asc(teams.createdAt));

    const allMatches = await this.dbService.db
      .select()
      .from(matches)
      .where(eq(matches.groupId, +groupId))
      .orderBy(desc(matches.createdAt));

    return {
      group,
      teams: allTeams,
      matches: allMatches,
    };
  }

  async createTeam(groupId: string, createTeamDto: CreateTeamDto) {
    await this.dbService.db
      .insert(teams)
      .values({
        ...createTeamDto,
        groupId: +groupId,
      })
      .execute();
  }

  async deleteTeam(teamId: string) {
    await this.dbService.db.delete(teams).where(eq(teams.id, +teamId));
  }

  async addMatch(groupId: string, addMatchDto: AddMatchDto) {
    await this.dbService.db
      .insert(matches)
      .values({
        ...addMatchDto,
        groupId: +groupId,
        winnerId: addMatchDto.winnerId ? +addMatchDto.winnerId : null,
      })
      .execute();
  }

  async updateMatch(updateMatchDto: UpdateMatchDto) {
    await this.dbService.db
      .update(matches)
      .set({
        ...updateMatchDto,
        winnerId: updateMatchDto.winnerId ? +updateMatchDto.winnerId : null,
      })
      .where(eq(matches.id, +updateMatchDto.matchId))
      .execute();
  }

  async deleteMatch(matchId: string) {
    await this.dbService.db.delete(matches).where(eq(matches.id, +matchId));
  }

  async deleteGroup(groupId: string) {
    await this.dbService.db.delete(groups).where(eq(groups.id, +groupId));
  }

  async deleteCategory(categoryId: string) {
    await this.dbService.db
      .delete(categories)
      .where(eq(categories.id, +categoryId));
  }

  async deleteStage(stageId: string) {
    await this.dbService.db.delete(stages).where(eq(stages.id, +stageId));
  }
}
