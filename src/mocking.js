import { trackPageView } from './libs/analytics';
import { getExchangeRate } from './libs/currency';
import { isValidEmail, sendEmail } from './libs/email';
import { charge } from './libs/payment';
import security from './libs/security';
import { getShippingQuote } from './libs/shipping';

// Lesson: Mocking modules
export function getPriceInCurrency(price, currency) {
  const rate = getExchangeRate('USD', currency);
  return price * rate;
}

// Exercise
/**
 * Get shipping information.
 * 
 * @param {string} destination 
 * 
 * @example ```javascript
 * getShippingInfo('New York');
 * // Shipping Cost: $10 (3 Days)
 * ```
 * 
 * @returns {string} Shipping information.
 */
export function getShippingInfo(destination) {
  const quote = getShippingQuote(destination);
  if (!quote) return 'Shipping Unavailable';
  return "Shipping Cost:"
    + ` $${quote.cost}`
    + ' ('
    + quote.estimatedDays
    + ' day'
    + `${(quote.estimatedDays > 1) ? 's' : ''}`
    + ').';
}

// Lesson: Interaction testing
/**
 * Render the home page.
 *  
 * @returns {Promise<string>} Rendered page content.
 */
export async function renderPage() {
  trackPageView('/home');

  return '<div>content</div>';
}

// Exercise
/**
 * Submit an order with the given payment information.
 * 
 * @param {{ totalAmount: number }} order The order to submit.
 * @param {{ creditCardNumber: number }} creditCard The payment information.
 * 
 * @returns {Promise<{
 *  success: boolean;
 *  error?: string;
 * }} Order submission result.
 */
export async function submitOrder(order, creditCard) {
  const paymentResult = await charge(creditCard, order.totalAmount);

  if (paymentResult.status === 'failed')
    return { success: false, error: 'payment_error' };

  return { success: true };
}

// Lesson: Partial mocking
/**
 * Sign up a user with the given email.
 * 
 * @param {string} email The user email
 * @returns {Promise<boolean>} True if the user signed up successfully otherwise false.
 */
export async function signUp(email) {
  if (!isValidEmail(email)) return false;

  try {
    await sendEmail(email, 'Welcome aboard!');
    return true;
  } catch {
    return false;
  }
}

// Lesson: Spying on functions
/**
 * Send a login code to the user.
 * 
 * @param {string} email The user email.
 * @returns {Promise<void>} A promise that resolves when the email is sent.
 */
export async function login(email) {
  const code = security.generateCode();

  await sendEmail(email, code.toString());
}

// Lesson: Mocking dates
export function isOnline() {
  const availableHours = [8, 20];
  const [open, close] = availableHours;
  const currentHour = new Date().getHours();

  return currentHour >= open && currentHour < close;
}

// Exercise
/**
 * Get the discount rate.
 * 
 * @returns {number} The discount rate.
 */
export function getDiscount() {
  const today = new Date();
  const isChristmasDay = today.getMonth() === 11 && today.getDate() === 25;
  return isChristmasDay ? 0.2 : 0;
}
