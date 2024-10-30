import { describe, it, expect } from 'vitest';
import { message, numbersArray, person } from '../src/core';

describe('Match Object', () => {
  it('should equals value', () => {
    const result = { name: 'Daniel' };
    expect(result).toEqual({ name: 'Daniel' });
  });
});

describe("Match strings", () => {
  it('should includes "not found" words', () => {
    const result = message();

    //? Loose (too general)
    expect(result).toBeDefined();

    //? Tight (too specific)
    // expect(result).toBe('The requested file was not found');

    //? Better assertion
    expect(result).toMatch(/not found/i);
  });
});

describe('Match arrays', () => {
  it('should returns an array of 3 numbers', () => {
    const result = numbersArray();

    //? Loose (too general)
    expect(result).toBeDefined();

    //? Tight (too specific)
    // expect(result).toEqual([1, 2, 3]);

    //? Better assertion but not the best
    // expect(result).toHaveLength(3);
    
    //? Better assertion
    expect(result.length).toBeGreaterThan(0);
    expect(result).toEqual(expect.arrayContaining([2, 4, 7]));
  });
});

describe('Match objects', () => {
  it('should returns an object', () => {

    const result = person('Daniel', 'Gonzalez');

    expect(result).toMatchObject({
      firstName: 'Daniel',
      lastName: 'Gonzalez',
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("firstName");
    expect(result).toHaveProperty("lastName");
    expect(typeof result.id).toBe("string");
    expect(typeof result.firstName).toBe("string");
    expect(typeof result.lastName).toBe("string");

  });
});