"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAdditionalPropsAndFilter = void 0;
const tslib_1 = require("tslib");
const cms_1 = require("@optimizely/cms");
function isPromise(toTest) {
    return typeof (toTest) === 'object' && toTest !== null && typeof (toTest.then) === 'function';
}
function loadAdditionalPropsAndFilter(content, api, locale, preview) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // Load component
        const moduleLoader = cms_1.ComponentLoader.setup();
        const component = (yield moduleLoader.tryDynamicAsync(content.contentType));
        // Load additional props
        const additionalProps = (component === null || component === void 0 ? void 0 : component.getStaticProps) && typeof (component === null || component === void 0 ? void 0 : component.getStaticProps) === 'function' ?
            yield component.getStaticProps(content, { api, locale: locale }) :
            {};
        // Apply content filter
        let filter = (component === null || component === void 0 ? void 0 : component.getContentFields) ? component === null || component === void 0 ? void 0 : component.getContentFields({ inEditMode: preview }) : undefined;
        if (isPromise(filter))
            filter = yield filter;
        if (Array.isArray(filter)) {
            const newContent = {
                contentLink: content.contentLink,
                contentType: content.contentType,
                language: content.language,
                name: content.name
            };
            for (const key of Object.getOwnPropertyNames(content))
                if (filter.indexOf(key) >= 0)
                    newContent[key] = content[key];
            content = newContent;
        }
        return Object.assign({ content }, additionalProps);
    });
}
exports.loadAdditionalPropsAndFilter = loadAdditionalPropsAndFilter;
//# sourceMappingURL=utils.js.map