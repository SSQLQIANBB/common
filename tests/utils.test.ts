import { describe, expect, it } from 'vitest';
import {
  isArray,
  isElement,
  isEmpty,
  isNullAndUnDef,
  isNullOrUnDef,
  isPromise,
  isUrl
} from '../packages/utils';

describe('utils type guards', () => {
  it('returns stable booleans for array checks', () => {
    expect(isArray([])).toBe(true);
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
  });

  it('recognizes promises and thenables with catch handlers', () => {
    expect(isPromise(Promise.resolve('ok'))).toBe(true);
    expect(isPromise({ then: () => undefined, catch: () => undefined })).toBe(true);
    expect(isPromise({ then: () => undefined })).toBe(false);
  });

  it('checks nullish values consistently', () => {
    expect(isNullAndUnDef(null)).toBe(true);
    expect(isNullAndUnDef(undefined)).toBe(true);
    expect(isNullAndUnDef('')).toBe(false);
    expect(isNullOrUnDef(null)).toBe(true);
    expect(isNullOrUnDef(undefined)).toBe(true);
  });

  it('detects empty collections and objects', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  it('recognizes element-like values without requiring a DOM runtime', () => {
    expect(isElement({ tagName: 'DIV' })).toBe(true);
    expect(isElement({})).toBe(false);
  });

  it('validates http urls', () => {
    expect(isUrl('https://example.com/path?a=1')).toBe(true);
    expect(isUrl('not-a-url')).toBe(false);
  });
});
