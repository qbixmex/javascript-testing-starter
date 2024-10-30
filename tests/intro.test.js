import { describe, test, it, expect } from "vitest";
import { max } from "../src/intro";

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