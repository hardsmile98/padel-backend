import { DbService } from 'src/common/db';
import { Injectable } from '@nestjs/common';
import { players } from 'src/common/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class FrontService {
  constructor(private readonly dbService: DbService) {}

  async getPlayers() {
    const allPlayers = await this.dbService.db.select().from(players);

    return allPlayers;
  }

  async getPlayerBySlug(slug: string) {
    const [player] = await this.dbService.db
      .select()
      .from(players)
      .where(eq(players.slug, slug));

    return {
      player,
    };
  }
}
