import { describe, it, expect } from 'vitest';
import {
  message,
  numbersArray,
  person,
  getCoupons,
  calculateDiscount,
  validateUserInput,
  isPriceInRange,
  isValidUsername,
  canDrive,
} from '../src/core';

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
});

describe('validateUserInput', () => {
  it('should returns success if given valid input', () => {
    const result = validateUserInput("captain", 28);
    expect(typeof result).toBe("string");
    expect(result).toMatch(/success/);
  });

  it('should returns an error if username is not a string', () => {
    expect(validateUserInput(true, 20)).toMatch(/invalid/i);
  });

  it('should returns an error if username is less than 3 characters', () => {
    expect(validateUserInput("da", 20)).toMatch(/invalid/i);
  });

  it('should returns an error if username is longer than 255 characters', () => {
    expect(validateUserInput("x".repeat(256), 20)).toMatch(/invalid/i);
  });

  it('should returns an error if age is not a number', () => {
    expect(validateUserInput("megaman", "20")).toMatch(/invalid/i);
  });

  it('should returns an error if age is bigger than 65', () => {
    expect(validateUserInput("pepi", 85)).toMatch(/invalid/i);
  });

  it('should returns an error if age is less than 18', () => {
    expect(validateUserInput("captain", 15)).toMatch(/invalid/i);
  });

  it('should returns an error if username and age are invalid', () => {
    const result = validateUserInput("", 0);
    expect(result).toMatch(/invalid username/i);
    expect(result).toMatch(/invalid age/i);
  });

  describe('isPriceInRange', () => {
    it('should returns false if the price is outside the range', () => {
      expect(isPriceInRange(-10, 0, 100)).toBe(false);
      expect(isPriceInRange(200, 50, 150)).toBe(false);
    });

    it('should returns true if the price is equals to the min or the the max', () => {
      expect(isPriceInRange(0, 0, 100)).toBe(true);
      expect(isPriceInRange(200, 0, 200)).toBe(true);
    });

    it('should returns true if the price is within the range', () => {
      expect(isPriceInRange(15, 10, 20)).toBe(true);
    });
  });

  describe('isValidUsername', () => {
    const minLength = 5;
    const maxLength = 15;

    it('should returns false if username is exactly the minimum length', () => {
      expect(isValidUsername("x".repeat(minLength))).toBe(true);
    });

    it('should returns false if username is exactly the maximum length', () => {
      expect(isValidUsername("x".repeat(maxLength))).toBe(true);
    });

    it('should returns false if username is too short', () => {
      expect(isValidUsername("x".repeat(minLength - 1))).toBe(false);
    });

    it('should returns false if username is too long', () => {
      expect(isValidUsername("x".repeat(maxLength + 1))).toBe(false);
    });

    it('should returns true if username is within the length constraint', () => {
      expect(isValidUsername("x".repeat(maxLength - 1))).toBe(true);
      expect(isValidUsername("x".repeat(minLength + 1))).toBe(true);
    });

    it('should returns false for invalid types', () => {
      expect(isValidUsername(undefined)).toBe(false);
      expect(isValidUsername("")).toBe(false);
      expect(isValidUsername(null)).toBe(false);
      expect(isValidUsername(44)).toBe(false);
    });
  });

  describe.only('canDrive', () => {
    it('should returns false if the age is not valid', () => {
      expect(canDrive(18, 'CA')).toMatch(/invalid/i);
    });

    it.each([
      { age: 15, country: 'US', result: false },
      { age: 12, country: 'MX', result: false },
      { age: 16, country: 'UK', result: false },
      { age: 16, country: 'US', result: true },
      { age: 18, country: 'MX', result: true },
      { age: 18, country: 'UK', result: true },
    ])(
      'should returns $result if the age is not valid in $country',
      ({ age, country, result }) => expect(canDrive(age, country)).toBe(result)
    );
  });

});
