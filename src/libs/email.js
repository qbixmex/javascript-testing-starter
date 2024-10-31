import delay from 'delay';

/**
 * Check if the given email is valid.
 * 
 * @param {string} email The user email.
 * 
 * @returns {boolean} `true` if the email is valid, otherwise `false`.
 */
export function isValidEmail(email) {
  const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  return emailPattern.test(email);
}

/**
 * Send an email to the given email address.
 * 
 * @param {string} to The email address to send the email to.
 * @param {string} message The email message.
 * 
 * @returns {Promise<void>} A promise that resolves when the email is sent.
 */
export async function sendEmail(to, message) {
  console.log(`Sending email to ${to}...`);
  console.log(`Message: ${message}`);
  await delay(3000);
}
