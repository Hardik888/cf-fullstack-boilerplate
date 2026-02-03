import { drizzle } from 'drizzle-orm/d1';

export class DatabaseService {
  private db;

  constructor(d1: D1Database) {
    this.db = drizzle(d1);
  }
}