import { vi, it, expect, describe } from 'vitest';
import {
  getPriceInCurrency,
  getShippingInfo,
} from '../src/mocking';
import {
  getExchangeRate,
} from '../src/libs/currency';
import {
  getShippingQuote,
} from '../src/libs/shipping';

vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');

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

  it('should return ok with mock function', () => {
    const sendText = vi.fn();

    sendText.mockReturnValue('ok');

    const result = sendText('lorem');

    expect(result).toBe('ok');
    expect(sendText).toHaveBeenCalledWith('lorem');
  });

  describe('getPriceInCurrency', () => {
    it('should price in target currency', () => {
      vi.mocked(getExchangeRate).mockReturnValue(1.5);

      const price = getPriceInCurrency(10, "AUD");

      expect(price).toBe(15);
    });
  });

  describe('getShippingInfo', () => {
    it('should returns unavailable if quote cannot be fetched', () => {
      vi.mocked(getShippingQuote).mockReturnValue(null);

      const result = getShippingInfo('Vancouver');

      expect(result).toMatch(/unavailable/i);
    });

    it('should return shipping info if quote can be fetched', () => {
      vi.mocked(getShippingQuote).mockReturnValue({
        cost: 10.75,
        estimatedDays: 2
      });

      const result = getShippingInfo('Los Angeles');

      // Individual
      expect(result).toMatch('$10.75');
      expect(result).toMatch(/2 day/i);

      // Combined
      expect(result).toMatch(/shipping cost: \$10.75 \(2 days\)/i);
    })
  });

});