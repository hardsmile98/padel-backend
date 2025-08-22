/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/common/db/schema/index.ts',
  out: './src/common/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
