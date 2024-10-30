import crypto from 'node:crypto';

/**
 * Returns a message when a file is not found.
 * @returns {string} Message when a file is not found. 
 * 
*/
export function message() {
  return "the requested file was not found";
};

/**
 * Returns an array of numbers.
 * @returns {number[]} Array of numbers.
 */
export function numbersArray() {
  return [ 3, 2, 4, 67, 7, 32 ];
};

/**
 * Create a person object with a UUID.
 * @param {string} firstName
 * @param {string} lastName
 * 
 * @example ```javascript
 * person('John', 'Doe');
 * person('Alice', 'Brown');
 * ```
 * 
 * @returns {{
 *  id: string;
 *  firstName: string;
 *  lastName: string
 * }} Person Object with UUID.
 */
export function person(firstName, lastName) {
  return {
    id: crypto.randomUUID(),
    firstName,
    lastName
  };
};

// Exercise: Writing good assertions
/**
 * Returns an array of coupons.
 * 
 * @returns {{
 *  code: string;
 *  discount: number;
 * }[]} Array of coupons.
 */
export function getCoupons() {
  return [
    { code: 'SAVE20NOW', discount: 0.2 },
    { code: 'DISCOUNT50OFF', discount: 0.5 },
  ];
}

// Lesson: Positive and negative testing

/**
 * Calculate the discount price based on the price and discount.
 * 
 * @example ```javascript
 * calculateDiscount(100, 'SAVE10');
 * calculateDiscount(200, 'SAVE20');
 * ```
 * @param {number} price 
 * @param {string} discountCode 
 * @returns The discounted price.
 */
export function calculateDiscount(price, discountCode) {
  if (typeof price !== 'number' || price <= 0) {
    return 'Invalid price';
  }

  if (typeof discountCode !== 'string') {
    return 'Invalid discount code';
  }

  let discount = 0;

  if (discountCode === 'SAVE10') {
    discount = 0.1;
  } else if (discountCode === 'SAVE20') {
    discount = 0.2;
  }

  return price - price * discount;
}

// Exercise: Positive and negative testing
/**
 * Validate the user input.
 * 
 * @param {string} username
 * @param {number} age
 * @returns {string | string[]} Successful message or errors string array.
 */
export function validateUserInput(username, age) {
  let errors = [];

  if (
    typeof username !== 'string'
    || username.length < 3
    || username.length > 255
  ) {
    errors.push('Invalid username');
  }

  if (typeof age !== 'number' || age < 18 || age >= 65) {
    errors.push('Invalid age');
  }

  return errors.length === 0 ? 'Validation successful' : errors.join(', ');
}

// Lesson: Boundary testing
/**
 * Check if the price is within the given range.
 * 
 * @param {number} price
 * @param {number} min
 * @param {number} max
 * @example ```javascript
 *  isPriceInRange(100, 50, 150); // true
 *  isPriceInRange(200, 50, 150); // false
 * ```
 * @returns {boolean} True if the price is within the range otherwise false.
 */
export function isPriceInRange(price, min, max) {
  return price >= min && price <= max;
}

// Exercise: Boundary testing
/**
 * Check if the username is valid.
 * @example ```javascript
 *  isValidUsername('john_doe'); // true
 *  isValidUsername('john'); // false
 * ```
 * @param {string} username
 * @returns {boolean} True if the username is valid otherwise false.
 */
export function isValidUsername(username) {
  if (!username) return false; 

  const minLength = 5;
  const maxLength = 15;

  return username.length >= minLength && username.length <= maxLength;
}

// Exercise: Boundary testing
/**
 * Check if the age is valid.
 * @param {number} age
 * @param {string} countryCode
 * 
 * @example ```javascript
 * canDrive(16, 'US'); // true
 * canDrive(16, 'UK'); // false
 * canDrive(18, 'MX'); // true
 * canDrive(18, 'CA'); // 'Invalid country code'
 * ```
 * 
 * @returns {boolean | string} True if the age is valid otherwise error message.
 */
export function canDrive(age, countryCode) {
  const legalDrivingAge = {
    US: 16,
    UK: 17,
    MX: 18,
  };

  if (!legalDrivingAge[countryCode]) {
    return 'Invalid country code';
  }

  return age >= legalDrivingAge[countryCode];
}

// Lesson: Testing asynchronous code
/**
 * Fetch data asynchronously. 
 * 
 * @returns {Promise<number[]>} Array of numbers.
 */
export function fetchData() {

  return Promise.reject({ reason: 'Operation failed' });

  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [1, 2, 3];
      resolve(data);
    });
  });
}

// Lesson: Setup and teardown
export class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}

// Additional exercises
export function createProduct(product) {
  if (!product.name)
    return {
      success: false,
      error: { code: 'invalid_name', message: 'Name is missing' },
    };

  if (product.price <= 0)
    return {
      success: false,
      error: { code: 'invalid_price', message: 'Price is missing' },
    };

  return { success: true, message: 'Product was successfully published' };
}

export function isStrongPassword(password) {
  // Check the length of the password (minimum 8 characters)
  if (password.length < 8) {
    return false;
  }

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Check if the password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // Check if the password contains at least one digit (number)
  if (!/\d/.test(password)) {
    return false;
  }

  // If all criteria are met, consider the password strong
  return true;
}
