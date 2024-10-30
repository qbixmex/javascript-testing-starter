import { describe, it, expect } from "vitest";

describe("test suite", () => {
  it("test case", () => {
    const result = { name: "Daniel" };
    expect(result).toEqual({ name: "Daniel" });
  });
});