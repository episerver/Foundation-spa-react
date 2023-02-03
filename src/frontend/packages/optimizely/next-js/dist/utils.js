import createComponentLoader from '@optimizely/cms/component-loader';
function isPromise(toTest) {
    return typeof (toTest) === 'object' && toTest !== null && typeof (toTest.then) === 'function';
}
export async function loadAdditionalPropsAndFilter(content, api, locale, preview) {
    const moduleLoader = createComponentLoader();
    const component = (await moduleLoader.tryDynamicAsync(content.contentType));
    const additionalProps = component?.getStaticProps && typeof (component?.getStaticProps) === 'function' ?
        await component.getStaticProps(content, { api, locale: locale }) :
        {};
    let filter = component?.getContentFields ? component?.getContentFields({ inEditMode: preview }) : undefined;
    if (isPromise(filter))
        filter = await filter;
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
    return {
        content,
        ...additionalProps
    };
}
//# sourceMappingURL=utils.js.map