export function isUser(toTest) {
    return typeof (toTest) === 'object' && toTest !== null && toTest.source === 'CMS11OAuth';
}
//# sourceMappingURL=guards.js.map