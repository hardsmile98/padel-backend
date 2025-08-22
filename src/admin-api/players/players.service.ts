import { DbService } from '../../common/db';
import { Injectable } from '@nestjs/common';
import { PlayerDto } from './dtos';
import { eq } from 'drizzle-orm';
import { players } from 'src/common/db/schema';

@Injectable()
export class PlayersService {
  constructor(private readonly dbService: DbService) {}

  async getPlayer(id: string) {
    const player = await this.dbService.db
      .select()
      .from(players)
      .where(eq(players.id, +id));
    return player;
  }

  async getPlayers() {
    const allPlayers = await this.dbService.db.select().from(players);

    return allPlayers;
  }

  async deletePlayer(id: string) {
    await this.dbService.db.delete(players).where(eq(players.id, +id));

    return { message: 'Игрок удален' };
  }

  async createPlayer(createPlayerDto: PlayerDto) {
    const newPlayer = await this.dbService.db
      .insert(players)
      .values(createPlayerDto)
      .execute();

    return newPlayer;
  }

  async updatePlayer(id: string, updatePlayerDto: PlayerDto) {
    const updatedPlayer = await this.dbService.db
      .update(players)
      .set(updatePlayerDto)
      .where(eq(players.id, +id))
      .execute();

    return updatedPlayer;
  }
}
