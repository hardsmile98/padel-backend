import { DbService } from 'src/common/db';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  categories,
  groups,
  players,
  stages,
  teams,
  tournaments,
} from 'src/common/db/schema';
import { and, asc, desc, eq, inArray, isNull, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';

@Injectable()
export class FrontService {
  getTournamentGroups() {
    throw new Error('Method not implemented.');
  }
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

    if (!player) {
      throw new NotFoundException('Игрок не найден');
    }

    const { rows } = await this.dbService.db.execute(sql`
        select
          m.id as match_id,
          m.group_id,
          m.sets,
          m.winner_id,
          m.created_at,
    
          t1.id as team1_id,
          p1.id as team1_p1_id,
          p1.first_name as team1_p1_first,
          p1.last_name as team1_p1_last,
          p1.avatar_url as team1_p1_avatar,
          p1.slug as team1_p1_slug,
          p2.id as team1_p2_id,
          p2.first_name as team1_p2_first,
          p2.last_name as team1_p2_last,
          p2.avatar_url as team1_p2_avatar,
          p2.slug as team1_p2_slug,
    
          t2.id as team2_id,
          p3.id as team2_p1_id,
          p3.first_name as team2_p1_first,
          p3.last_name as team2_p1_last,
          p3.slug as team2_p1_slug,
          p4.id as team2_p2_id,
          p4.first_name as team2_p2_first,
          p4.last_name as team2_p2_last,
          p4.avatar_url as team2_p2_avatar,
          p4.slug as team2_p2_slug
    
        from matches m
        join teams t1 on m.team1_id = t1.id
        join players p1 on t1.player1_id = p1.id
        join players p2 on t1.player2_id = p2.id
        join teams t2 on m.team2_id = t2.id
        join players p3 on t2.player1_id = p3.id
        join players p4 on t2.player2_id = p4.id
        where ${player.id} in (t1.player1_id, t1.player2_id, t2.player1_id, t2.player2_id)
        order by m.created_at desc
      `);

    const matches = rows?.map((r) => ({
      id: r.match_id,
      groupId: r.group_id,
      sets: r.sets,
      winnerId: r.winner_id,
      createdAt: r.created_at,
      team1: {
        id: r.team1_id,
        player1: {
          id: r.team1_p1_id,
          firstName: r.team1_p1_first,
          lastName: r.team1_p1_last,
          avatarUrl: r.team1_p1_avatar,
          slug: r.team1_p1_slug,
        },
        player2: {
          id: r.team1_p2_id,
          firstName: r.team1_p2_first,
          lastName: r.team1_p2_last,
          avatarUrl: r.team1_p2_avatar,
          slug: r.team1_p2_slug,
        },
      },
      team2: {
        id: r.team2_id,
        player1: {
          id: r.team2_p1_id,
          firstName: r.team2_p1_first,
          lastName: r.team2_p1_last,
          avatarUrl: r.team2_p1_avatar,
          slug: r.team2_p1_slug,
        },
        player2: {
          id: r.team2_p2_id,
          firstName: r.team2_p2_first,
          lastName: r.team2_p2_last,
          avatarUrl: r.team2_p2_avatar,
          slug: r.team2_p2_slug,
        },
      },
    }));

    return {
      player,
      matches,
    };
  }

  async getTournamentPlayers() {
    const activePlayerIds = await this.dbService.db
      .select({ id: teams.player1Id })
      .from(teams)
      .innerJoin(groups, eq(teams.groupId, groups.id))
      .innerJoin(tournaments, eq(groups.tournamentId, tournaments.id))
      .where(eq(tournaments.isActive, true))
      .union(
        this.dbService.db
          .select({ id: teams.player2Id })
          .from(teams)
          .innerJoin(groups, eq(teams.groupId, groups.id))
          .innerJoin(tournaments, eq(groups.tournamentId, tournaments.id))
          .where(eq(tournaments.isActive, true)),
      );

    const activePlayers = await this.dbService.db
      .select({
        id: players.id,
        firstName: players.firstName,
        lastName: players.lastName,
        slug: players.slug,
        avatarUrl: players.avatarUrl,
      })
      .from(players)
      .where(
        inArray(
          players.id,
          activePlayerIds.map((p) => p.id),
        ),
      );

    return activePlayers;
  }

  async getActiveTournament() {
    const [tournament] = await this.dbService.db
      .select()
      .from(tournaments)
      .where(eq(tournaments.isActive, true));

    if (!tournament) {
      throw new NotFoundException('Турнир не найден');
    }

    const allStages = await this.dbService.db
      .select()
      .from(stages)
      .where(eq(stages.tournamentId, tournament.id))
      .orderBy(asc(stages.order));

    const allCategories = await this.dbService.db
      .select()
      .from(categories)
      .where(eq(categories.tournamentId, tournament.id))
      .orderBy(asc(categories.order));

    const allGroups = await this.dbService.db
      .select()
      .from(groups)
      .where(eq(groups.tournamentId, tournament.id))
      .orderBy(asc(groups.createdAt));

    return {
      tournament,
      stages: allStages,
      categories: allCategories,
      groups: allGroups,
    };
  }

  async getGroupStatistics(groupId: string) {
    const [group] = await this.dbService.db
      .select()
      .from(groups)
      .where(eq(groups.id, +groupId));

    if (!group) {
      throw new NotFoundException('Группа не найдена');
    }

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
      .where(eq(teams.groupId, group.id))
      .innerJoin(player1, eq(teams.player1Id, player1.id))
      .innerJoin(player2, eq(teams.player2Id, player2.id))
      .orderBy(asc(teams.createdAt));

    const { rows } = await this.dbService.db.execute(sql`
      select
        m.id as match_id,
        m.group_id,
        m.sets,
        m.winner_id,
        m.created_at,
  
        t1.id as team1_id,
        p1.id as team1_p1_id,
        p1.first_name as team1_p1_first,
        p1.last_name as team1_p1_last,
        p1.avatar_url as team1_p1_avatar,
        p1.slug as team1_p1_slug,
        p2.id as team1_p2_id,
        p2.first_name as team1_p2_first,
        p2.last_name as team1_p2_last,
        p2.avatar_url as team1_p2_avatar,
        p2.slug as team1_p2_slug,
  
        t2.id as team2_id,
        p3.id as team2_p1_id,
        p3.first_name as team2_p1_first,
        p3.last_name as team2_p1_last,
        p3.avatar_url as team2_p1_avatar,
        p3.slug as team2_p1_slug,
        p4.id as team2_p2_id,
        p4.first_name as team2_p2_first,
        p4.last_name as team2_p2_last,
        p4.avatar_url as team2_p2_avatar,
        p4.slug as team2_p2_slug
  
      from matches m
      join teams t1 on m.team1_id = t1.id
      join players p1 on t1.player1_id = p1.id
      join players p2 on t1.player2_id = p2.id
      join teams t2 on m.team2_id = t2.id
      join players p3 on t2.player1_id = p3.id
      join players p4 on t2.player2_id = p4.id
      where m.group_id = ${group.id}
      order by m.created_at desc
    `);

    const matches = rows.map((r) => ({
      id: r.match_id,
      groupId: r.group_id,
      sets: r.sets,
      winnerId: r.winner_id,
      createdAt: r.created_at,
      team1: {
        id: r.team1_id,
        player1: {
          id: r.team1_p1_id,
          firstName: r.team1_p1_first,
          lastName: r.team1_p1_last,
          avatarUrl: r.team1_p1_avatar,
          slug: r.team1_p1_slug,
        },
        player2: {
          id: r.team1_p2_id,
          firstName: r.team1_p2_first,
          lastName: r.team1_p2_last,
          avatarUrl: r.team1_p2_avatar,
          slug: r.team1_p2_slug,
        },
      },
      team2: {
        id: r.team2_id,
        player1: {
          id: r.team2_p1_id,
          firstName: r.team2_p1_first,
          lastName: r.team2_p1_last,
          avatarUrl: r.team2_p1_avatar,
          slug: r.team2_p1_slug,
        },
        player2: {
          id: r.team2_p2_id,
          firstName: r.team2_p2_first,
          lastName: r.team2_p2_last,
          avatarUrl: r.team2_p2_avatar,
          slug: r.team2_p2_slug,
        },
      },
    }));

    return {
      group,
      matches,
      teams: allTeams,
    };
  }
}
