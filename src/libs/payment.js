import delay from 'delay';

/**
 * Charge the given credit card with the given amount.
 * 
 * @param {{
 *  creditCardNumber: number,
 * }} creditCardInfo The payment information.
 * @param {number} amount The total amount to charge.
 * 
 * @returns {Promise<{ status: string }>} Payment result.
 */
export async function charge(creditCardInfo, amount) {
  console.log(`Charging Credit Card: ${creditCardInfo.creditCardNumber}`);
  console.log(`Amount: ${amount}`);
  await delay(3000);
  return { status: 'success' };
}
