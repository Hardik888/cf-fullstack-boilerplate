import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export class DatabaseService {
  public readonly db;

  constructor(d1: D1Database) {
    this.db = drizzle(d1, { schema });
  }
}