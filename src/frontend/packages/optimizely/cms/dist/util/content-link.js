export function isContentLink(toTest) {
    if (typeof (toTest) !== 'object' || toTest === null)
        return false;
    return typeof (toTest.guidValue) == 'string' || typeof (toTest.id) == 'number';
}
//# sourceMappingURL=content-link.js.map