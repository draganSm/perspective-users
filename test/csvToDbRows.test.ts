import { describe, expect, test } from '@jest/globals';
import { csvToDbRows } from '../src/common/csvToDbRows';

describe('csvToDbRows', () => {
  test('Should convert csv to list of objects', () => {
    const data = `id,color,size
1,blue,xxl
2,red,m
3,yellow,s
4,black,s`;
    expect(csvToDbRows(data)).toEqual([
      { color: 'blue', size: 'xxl' },
      { color: 'red', size: 'm' },
      { color: 'yellow', size: 's' },
      { color: 'black', size: 's' },
    ]);
  });
});
