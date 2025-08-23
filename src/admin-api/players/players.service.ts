import { DbService } from '../../common/db';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PlayerDto } from './dtos';
import { and, desc, eq, isNull } from 'drizzle-orm';
import { players } from 'src/common/db/schema';

@Injectable()
export class PlayersService {
  constructor(private readonly dbService: DbService) {}

  async getPlayer(id: string) {
    const player = await this.dbService.db
      .select()
      .from(players)
      .where(and(eq(players.id, +id), isNull(players.deletedAt)));

    return player;
  }

  async getPlayers() {
    const activePlayers = await this.dbService.db
      .select()
      .from(players)
      .where(isNull(players.deletedAt))
      .orderBy(desc(players.createdAt));

    return activePlayers;
  }

  async deletePlayer(id: string) {
    await this.dbService.db
      .update(players)
      .set({ deletedAt: new Date() })
      .where(eq(players.id, +id));

    return { message: 'Игрок удален' };
  }

  async createPlayer(createPlayerDto: PlayerDto) {
    const [player] = await this.dbService.db
      .select()
      .from(players)
      .where(eq(players.slug, createPlayerDto.slug));

    if (player) {
      if (player.deletedAt !== null) {
        const updatedPlayer = await this.dbService.db
          .update(players)
          .set({ ...createPlayerDto, deletedAt: null })
          .where(eq(players.id, +player.id))
          .returning();

        return updatedPlayer;
      } else {
        throw new BadRequestException('Игрок с таким slug уже существует');
      }
    }

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
