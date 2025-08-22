import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import 'dotenv/config';

@Injectable()
export class DbService implements OnModuleDestroy {
  private pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  db = drizzle(this.pool, { schema });

  async onModuleDestroy() {
    await this.pool.end();
  }
}
