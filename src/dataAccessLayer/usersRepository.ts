import type { Knex } from 'knex';
import { User } from '../models/user';

type Order = 'asc' | 'desc';

export class UsersRepository {
  constructor(private knex: Knex) {}

  getAll(sortOrder: Order): Promise<User[]> {
    return this.knex('users').orderBy('created_at', sortOrder);
  }

  add(newUser: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    return this.knex('users').insert(newUser);
  }
}
