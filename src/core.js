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
export function validateUserInput(username, age) {
  let errors = [];

  if (typeof username !== 'string' || username.length < 3) {
    errors.push('Invalid username');
  }

  if (typeof age !== 'number' || age < 18) {
    errors.push('Invalid age');
  }

  return errors.length === 0 ? 'Validation successful' : errors.join(', ');
}

// Lesson: Boundary testing
export function isPriceInRange(price, min, max) {
  return price >= min && price <= max;
}

// Exercise: Boundary testing
export function isValidUsername(username) {
  const minLength = 5;
  const maxLength = 15;

  return username.length >= minLength && username.length <= maxLength;
}

// Exercise: Boundary testing
export function canDrive(age, countryCode) {
  const legalDrivingAge = {
    US: 16,
    UK: 17,
  };

  if (!legalDrivingAge[countryCode]) {
    return 'Invalid country code';
  }

  return age >= legalDrivingAge[countryCode];
}

// Lesson: Testing asynchronous code
export function fetchData() {
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
