import { Cart, CartWithTotals } from '../models'

export function isCart(toTest ?: Cart | CartWithTotals | undefined | null) : toTest is Cart
{
    if (!toTest)
        return false
    if (typeof(toTest) !== 'object' || toTest === null)
        return false

    if (!((toTest as Cart).customerId && (toTest as Cart).name && (toTest as Cart).market))
        return false

    return true
}

export function isCartWithTotals(toTest ?: Cart | CartWithTotals | undefined | null) : toTest is CartWithTotals
{
    if (!toTest)
        return false
    if (typeof(toTest) !== 'object' || toTest === null)
        return false

    return (toTest as CartWithTotals).cart && isCart((toTest as CartWithTotals).cart) && typeof((toTest as CartWithTotals).totals) == 'object'
}

export function getCartData(input : Cart | CartWithTotals) : Cart 
{
    return isCartWithTotals(input) ? input.cart : input
}