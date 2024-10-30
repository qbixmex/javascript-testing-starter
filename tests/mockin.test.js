import { vi, it, expect, describe } from 'vitest'

describe('mocking', () => {
  it('mock returning value', () => {
    const greet = vi.fn();

    const text = 'Hello';

    greet.mockReturnValue(text);

    const result = greet();

    expect(result).toBe(text);
  });

  it('mock returning promise with then', () => {
    const greet = vi.fn();

    const text = 'Hello';

    greet.mockResolvedValue(text);

    greet().then((result) => expect(result).toBe(text));

  });

  it('mock returning promise async and await', async () => {
    const greet = vi.fn();

    const text = 'Hello';

    greet.mockResolvedValue(text);

    const result = await greet();

    expect(result).toBe(text);
  });

  it('mock with logic', () => {
    const greet = vi.fn();

    const testName = "Daniel";

    greet.mockImplementation((name) => `Hello ${name}`);

    const result = greet(testName);

    expect(result).toBe(`Hello ${testName}`);
    expect(greet).toHaveBeenCalled();
    expect(greet).toHaveBeenCalledOnce();
    expect(greet).toHaveBeenCalledTimes(1);
    expect(greet).toHaveBeenCalledWith(testName);
  });

});