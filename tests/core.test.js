import { describe, it, expect } from 'vitest';
import { message, numbersArray, person, getCoupons, calculateDiscount } from '../src/core';

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

describe('getCoupons', () => {
  it('should returns an array', () => {
    const coupons = getCoupons();
    expect(Array.isArray(coupons)).toBe(true);
  });

  it('should returns an array of coupons', () => {
    const coupons = getCoupons();
    expect(coupons.length).toBeGreaterThan(0);
  });

  it('should returns an array with valid coupon code', () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(typeof coupon.code).toBe("string");
      expect(coupon.code).toBeTruthy();
    });
  });

  it('should returns an array with valid discount', () => {
    const objects = getCoupons();
    objects.forEach((coupon) => {
      expect(coupon).toHaveProperty("discount");
      expect(typeof coupon.discount).toBe("number");
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThanOrEqual(0.5);
    });
  });
});

describe('calculateDiscount', () => {
  it('should return discounted price if given valid code', () => {
    expect(calculateDiscount(10, "SAVE10")).toBe(9);
    expect(calculateDiscount(10, "SAVE20")).toBe(8);
  });

  it('should handle non-numeric price', () => {
    expect(calculateDiscount("10", "SAVE10")).toMatch(/invalid/i);
  });

  it('should handle negative price', () => {
    expect(calculateDiscount(-10, "SAVE10")).toMatch(/invalid/i);
  });

  it('should handle non-string discount code', () => {
    expect(calculateDiscount(10, 20)).toMatch(/invalid/i);
  });

  it('should handle invalid discount code', () => {
    const price = 10;
    expect(calculateDiscount(price, "SAVE50")).toBe(price);
  });
})
