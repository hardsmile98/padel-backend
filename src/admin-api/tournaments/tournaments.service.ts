import { stages, tournaments } from 'src/common/db/schema';
import { DbService } from '../../common/db';
import { Injectable } from '@nestjs/common';
import { CreateStageDto, CreateTournamentDto, SetActiveStageDto } from './dtos';
import { asc, desc, eq } from 'drizzle-orm';

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

    return {
      tournament,
      stages: allStages,
    };
  }

  async setActiveStage(id: string, setActiveStageDto: SetActiveStageDto) {
    await this.dbService.db
      .update(tournaments)
      .set({ currentStageId: setActiveStageDto.stageId })
      .where(eq(tournaments.id, +id));
  }
}
