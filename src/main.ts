/**
 * Calculate the discount price based on the price and discount.
 * 
 * @example ```typescript
 * calculateDiscount(100, 'SAVE10');
 * calculateDiscount(200, 'SAVE20');
 * ```
 * @param price The product price.
 * @param discountCode The discount code for the product.
 * 
 * @returns The discounted price or error as string.
 */
export const calculateDiscount = (
  price: number,
  discountCode: string,
): number | string => {
  if (price <= 0) {
    return 'Invalid price';
  }

  let discount = 0;

  if (discountCode === 'SAVE10') {
    discount = 0.1;
  } else if (discountCode === 'SAVE20') {
    discount = 0.2;
  }

  return price - price * discount;
};
