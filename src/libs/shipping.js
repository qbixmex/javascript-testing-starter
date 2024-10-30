
/**
 * Get a shipping quote for a given destination.
 * 
 * @param {string} destination
 * 
 * @example ```javascript
 * getShippingQuote('Ney York');
 * ```
 * 
 * @returns {{
 *  cost: number;
 *  estimatedDays: number;
 * }} - The shipping quote
 */
export function getShippingQuote(destination) {
  console.log(`Getting a shipping quote for ${destination}...`);
  return { cost: 10 * Math.random(), estimatedDays: 2 };
}