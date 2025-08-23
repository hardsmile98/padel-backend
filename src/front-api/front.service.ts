import { DbService } from 'src/common/db';
import { Injectable } from '@nestjs/common';
import { players } from 'src/common/db/schema';
import { and, desc, eq, isNull } from 'drizzle-orm';

@Injectable()
export class FrontService {
  constructor(private readonly dbService: DbService) {}

  async getPlayers() {
    const activePlayers = await this.dbService.db
      .select()
      .from(players)
      .where(isNull(players.deletedAt))
      .orderBy(desc(players.createdAt));

    return activePlayers;
  }

  async getPlayerBySlug(slug: string) {
    const [player] = await this.dbService.db
      .select()
      .from(players)
      .where(and(eq(players.slug, slug), isNull(players.deletedAt)));

    return {
      player,
    };
  }
}
