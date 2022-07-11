import { Cart, CartWithTotals } from '../models';
export declare function isCart(toTest?: Cart | CartWithTotals | undefined | null): toTest is Cart;
export declare function isCartWithTotals(toTest?: Cart | CartWithTotals | undefined | null): toTest is CartWithTotals;
export declare function getCartData(input: Cart | CartWithTotals): Cart;
