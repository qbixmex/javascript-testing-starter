import { describe, it, expect } from "vitest";
import { max, fizzBuzz, calculateAverage, factorial } from "../src/intro";

// (AAA) Pattern

// Arrange (is where you set up the test environment.)
// Grab the remote, and sit on the couch.

// Act (is where you perform the actual test.)
// Press the power button on the remote.

// Assert (is where you verify that the test passed.)
// The TV should turn on.

describe("Max", () => {
  it("should return the first argument if it is greater", () => {
    // Arrange
    const a = 2;
    const b = 1;

    // Act
    const result = max(a, b);

    // Assert
    expect(result).toBe(2);
  });

  it("should return the second argument if it is greater", () => {
    expect(max(1, 2)).toBe(2);
  });

  it("should return the first argument if it is greater", () => {
    expect(max(1, 1)).toBe(1);
  });
});

describe("FizzBuzz", () => {
  it("should return FizzBuzz if argument is divisible by 3 or 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });
  it("should return Fizz if argument is only divisible by 3", () => {
    expect(fizzBuzz(9)).toBe("Fizz");
  });
  it("should return Buzz if argument is only divisible by 5", () => {
    expect(fizzBuzz(25)).toBe("Buzz");
  });
  it("should return the argument as string if it's not divisible by 3 or 5", () => {
    expect(fizzBuzz(8)).toBe("8");
  });
});

describe('calculateAverage', () => {
  it('should return NaN if given an empty array', () => {
    expect(calculateAverage([])).toBeNaN();
  });
  it('should calculate the average of an array with a single element', () => {
    expect(calculateAverage([1])).toBe(1);
  });
  it('should calculate the average of an array with a two elements', () => {
    expect(calculateAverage([1,2])).toBe(1.5);
  });
  it('should calculate the average of an array with a three elements', () => {
    expect(calculateAverage([1,2,3])).toBe(2);
  });
});

describe('factorial', () => {
  it('should return 1 if given 0', () => {
    expect(factorial(0)).toBe(1);
  });
  it('should return 1 if given 1', () => {
    expect(factorial(1)).toBe(1);
  });
  it('should return 2 factorial if given 2', () => {
    expect(factorial(2)).toBe(2);
  });
  it('should return 6 factorial if given 3', () => {
    expect(factorial(3)).toBe(6);
  });
  it('should return 24 factorial if given 4', () => {
    expect(factorial(4)).toBe(24);
  });
  it('should return undefined if given negative number', () => {
    expect(factorial(-1)).toBeUndefined();
  });
});