import { pgTable, serial, varchar, jsonb, numeric } from 'drizzle-orm/pg-core';

export const players = pgTable('players', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).unique(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  raiting: numeric('raiting', { mode: 'number' }).default(null),
  avatarUrl: varchar('avatar_url', { length: 500 }).default(null),
  photoUrl: varchar('photo_url', { length: 500 }).default(null),
  description: jsonb('description').$type<string[]>().default(null),
});

export type Player = typeof players.$inferSelect;
export type NewPlayer = typeof players.$inferInsert;
