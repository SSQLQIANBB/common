import { describe, expect, it } from 'vitest';
import { formatRequestDate, joinTimestamp, setObjToUrlParams } from '../packages/http/helper';

describe('http helper', () => {
  it('joins timestamp as params or restful query string', () => {
    expect(joinTimestamp(false, false)).toEqual({});
    expect(joinTimestamp(false, true)).toBe('');
    expect(joinTimestamp(true, false)).toHaveProperty('_t');
    expect(String(joinTimestamp(true, true))).toMatch(/^\?_t=\d+$/);
  });

  it('formats date-like values and trims strings deeply', () => {
    const params = {
      name: '  alice  ',
      nested: {
        value: '  hello  ',
        createdAt: {
          format: (format: string) => `date:${format}`
        }
      }
    };

    formatRequestDate(params);

    expect(params.name).toBe('alice');
    expect(params.nested.value).toBe('hello');
    expect(params.nested.createdAt).toBe('date:YYYY-MM-DD HH:mm');
  });

  it('appends object values to urls with the correct separator', () => {
    expect(setObjToUrlParams('/api/users', { page: 1, keyword: 'a b' })).toBe('/api/users?page=1&keyword=a%20b');
    expect(setObjToUrlParams('/api/users?active=1', { page: 2 })).toBe('/api/users?active=1&page=2');
    expect(setObjToUrlParams('/api/users?', { page: 2 })).toBe('/api/users?page=2');
  });
});
