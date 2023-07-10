import { describe, expect, test, beforeAll } from '@jest/globals';

import request from 'supertest';
import { migrateLatest } from './utils';
import { app } from '../src/common/app';
import { User } from '../src/models/user';
import { HttpStatusCode } from '../src/common/constants';

describe('users', () => {
  beforeAll(async () => {
    await migrateLatest();
  });

  test('should return list of users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(HttpStatusCode.OK);
    for (const user of response.body) {
      expect(user).toEqual(
        expect.objectContaining({
          first_name: expect.any(String),
          last_name: expect.any(String),
          email: expect.any(String),
          address: expect.any(String),
          zip_code: expect.any(String),
          city: expect.any(String),
          country: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
        }),
      );
    }
  });

  test('Should sort users in ascending order based on created_at field', async () => {
    const response = await request(app).get('/users?created=asc');
    expect(response.status).toBe(HttpStatusCode.OK);
    const users = response.body as User[];
    for (let i = 0; i < users.length - 1; i += 1) {
      expect(new Date(users[i].created_at) < new Date(users[i + 1].created_at)).toBeTruthy();
    }
  });

  test('Should sort users in descending order based on created_at field', async () => {
    const response = await request(app).get('/users?created=desc');
    expect(response.status).toBe(HttpStatusCode.OK);
    const users = response.body as User[];
    for (let i = 0; i < users.length - 1; i += 1) {
      expect(new Date(users[i].created_at) > new Date(users[i + 1].created_at)).toBeTruthy();
    }
  });

  test('Should return validation error', async () => {
    const response = await request(app).post('/users').send({});
    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.body).toEqual({
      error: {
        address: ['Required'],
        city: ['Required'],
        country: ['Required'],
        email: ['Required'],
        first_name: ['Required'],
        last_name: ['Required'],
        zip_code: ['Required'],
      },
      message: 'Validation Failed',
    });
  });

  test('Should reject duplicated email', async () => {
    const khr = {
      first_name: 'Karl-Heinz',
      last_name: 'Rummenigge',
      email: 'khr@fifa.com',
      address: 'Street 123',
      zip_code: '12345',
      city: 'City',
      country: 'Country',
    };
    const response1 = await request(app).post('/users').send(khr);
    expect(response1.status).toBe(HttpStatusCode.CREATED);

    const response2 = await request(app).post('/users').send(khr);
    expect(response2.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response2.body).toEqual({
      error: {
        email: ['Already exists'],
      },
      message: 'Validation Failed',
    });
  });
});
