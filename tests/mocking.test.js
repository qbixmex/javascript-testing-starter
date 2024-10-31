import { vi, it, expect, describe, beforeEach } from 'vitest';
import {
  getPriceInCurrency,
  getShippingInfo,
  renderPage,
  submitOrder,
  signUp,
  login,
} from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';
import { trackPageView } from '../src/libs/analytics';
import { charge } from '../src/libs/payment';
import { sendEmail } from '../src/libs/email';
import security from '../src/libs/security';

vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');
vi.mock('../src/libs/analytics');
vi.mock('../src/libs/payment');

vi.mock('../src/libs/email', async (importOriginalModule) => {
  const originalModule = await importOriginalModule();
  return {
    ...originalModule,
    sendEmail: vi.fn(),
  };
});

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

  describe('renderPage', () => {
    it('should return correct content', async () => {
      const result = await renderPage();

      expect(result).toMatch(/content/i);
    });

    it('should call analytics', async () => {
      await renderPage();
      expect(trackPageView).toHaveBeenCalledWith('/home');
    });
  });

  describe('submitOrder', () => {
    const order = { totalAmount: 10 };
    const creditCard = { creditCardNumber: 1234 };

    it('should charge the customer', async () => {
      vi.mocked(charge).mockResolvedValue({ status: 'success' });

      await submitOrder(order, creditCard);

      expect(charge)
        .toHaveBeenCalledWith(creditCard, order.totalAmount);
    });

    it('should returns success if payment is successful', async () => {
      vi.mocked(charge).mockResolvedValue({ status: 'success' });

      const result = await submitOrder(order, creditCard);

      expect(result).toEqual({ success: true });
    });

    it('should returns error message if payment was failed', async () => {
      vi.mocked(charge).mockResolvedValue({ status: 'failed' });

      const result = await submitOrder(order, creditCard);

      expect(result).toEqual({
        success: false,
        error: 'payment_error'
      });
    });
  });

  describe('signUp', () => {
    const testEmail = 'user@domain.com';

    it.skip('should return false if email is not valid', async () => {
      const result = await signUp('john_gmail.com');
      expect(result).toBe(false);
    });

    it('should return true if email is valid', async () => {
      const result = await signUp(testEmail);
      expect(result).toBe(true);
    });

    it('should send the welcome email if email is valid', async () => {
      await signUp(testEmail);

      expect(sendEmail).toHaveBeenCalledOnce();

      const args = vi.mocked(sendEmail).mock.calls[0];

      expect(args[0]).toBe(testEmail);
      expect(args[1]).toMatch(/welcome/i);
    });
  });

  describe('login', () => {
    const email = 'user@domain.com';

    it('should email the one-time login code ', async () => {
      const spy = vi.spyOn(security, 'generateCode');

      await login(email);

      const securityCode = spy.mock.results.at(0).value.toString();

      expect(sendEmail).toHaveBeenCalledWith(email, securityCode);
      expect(sendEmail).toHaveBeenCalledOnce();
    });
  });

});