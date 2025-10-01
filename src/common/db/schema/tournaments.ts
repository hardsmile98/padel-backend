import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { players } from './players';

export const tournaments = pgTable('tournaments', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  isActive: boolean('is_active').default(false).notNull(),
  currentStageId: integer('current_stage_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const stages = pgTable('stages', {
  id: serial('id').primaryKey(),
  tournamentId: integer('tournament_id')
    .references(() => tournaments.id, { onDelete: 'cascade' })
    .notNull(),
  isFinal: boolean('is_final').default(false).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  tournamentId: integer('tournament_id')
    .references(() => tournaments.id, { onDelete: 'cascade' })
    .notNull(),
  stageId: integer('stage_id')
    .references(() => stages.id, { onDelete: 'cascade' })
    .notNull(),
  parentCategoryId: integer('parent_category_id').references(
    () => categories.id,
    { onDelete: 'cascade' },
  ),
  name: varchar('name', { length: 255 }).notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  tournamentId: integer('tournament_id')
    .references(() => tournaments.id, { onDelete: 'cascade' })
    .notNull(),
  stageId: integer('stage_id')
    .references(() => stages.id, { onDelete: 'cascade' })
    .notNull(),
  categoryId: integer('category_id').references(() => categories.id, {
    onDelete: 'cascade',
  }),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  groupId: integer('group_id')
    .references(() => groups.id, { onDelete: 'cascade' })
    .default(null),
  categoryId: integer('category_id')
    .references(() => categories.id, {
      onDelete: 'cascade',
    })
    .default(null),
  player1Id: integer('player1_id')
    .references(() => players.id, { onDelete: 'cascade' })
    .notNull(),
  player2Id: integer('player2_id')
    .references(() => players.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const matches = pgTable('matches', {
  id: serial('id').primaryKey(),
  groupId: integer('group_id')
    .references(() => groups.id, { onDelete: 'cascade' })
    .notNull(),
  team1Id: integer('team1_id')
    .references(() => teams.id, { onDelete: 'cascade' })
    .notNull(),
  team2Id: integer('team2_id')
    .references(() => teams.id, { onDelete: 'cascade' })
    .notNull(),
  sets: jsonb('sets').default([]).notNull(),
  winnerId: integer('winner_id').references(() => teams.id, {
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
