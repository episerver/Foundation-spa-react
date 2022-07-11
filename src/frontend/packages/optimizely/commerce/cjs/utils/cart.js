"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartData = exports.isCartWithTotals = exports.isCart = void 0;
function isCart(toTest) {
    if (!toTest)
        return false;
    if (typeof (toTest) !== 'object' || toTest === null)
        return false;
    if (!(toTest.customerId && toTest.name && toTest.market))
        return false;
    return true;
}
exports.isCart = isCart;
function isCartWithTotals(toTest) {
    if (!toTest)
        return false;
    if (typeof (toTest) !== 'object' || toTest === null)
        return false;
    return toTest.cart && isCart(toTest.cart) && typeof (toTest.totals) == 'object';
}
exports.isCartWithTotals = isCartWithTotals;
function getCartData(input) {
    return isCartWithTotals(input) ? input.cart : input;
}
exports.getCartData = getCartData;
//# sourceMappingURL=cart.js.map