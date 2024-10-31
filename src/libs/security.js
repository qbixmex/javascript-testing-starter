/**
 * Generate a random 6 digit code.
 * 
 * @returns {number} The generated code.
 */
export function generateCode() {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

export default {
  generateCode,
};
