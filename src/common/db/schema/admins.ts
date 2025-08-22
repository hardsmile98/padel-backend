import { InferSelectModel } from 'drizzle-orm';
import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  login: varchar('login', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Admin = InferSelectModel<typeof admins>;
