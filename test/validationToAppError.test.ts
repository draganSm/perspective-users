import { describe, expect, test } from '@jest/globals';
import { validationToAppError } from '../src/common/validationToAppError';
import { ZodIssue } from 'zod';

describe('validationToAppError', () => {
  test('Should convert ZOD issues list to an object', () => {
    expect(
      validationToAppError([
        {
          path: ['email'],
          message: 'Invalid',
        },
        {
          path: ['first_name'],
          message: 'Required',
        },
      ] as ZodIssue[]),
    ).toEqual({
      email: ['Invalid'],
      first_name: ['Required'],
    });
  });

  test('Should support multiple verification issues', () => {
    expect(
      validationToAppError([
        {
          path: ['email'],
          message: 'Invalid',
        },
        {
          path: ['email'],
          message: 'Already exists',
        },
      ] as ZodIssue[]),
    ).toEqual({
      email: ['Invalid', 'Already exists'],
    });
  });
});
