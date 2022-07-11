export function isCart(toTest) {
    if (!toTest)
        return false;
    if (typeof (toTest) !== 'object' || toTest === null)
        return false;
    if (!(toTest.customerId && toTest.name && toTest.market))
        return false;
    return true;
}
export function isCartWithTotals(toTest) {
    if (!toTest)
        return false;
    if (typeof (toTest) !== 'object' || toTest === null)
        return false;
    return toTest.cart && isCart(toTest.cart) && typeof (toTest.totals) == 'object';
}
export function getCartData(input) {
    return isCartWithTotals(input) ? input.cart : input;
}
//# sourceMappingURL=cart.js.map