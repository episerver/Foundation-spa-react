import { resolve } from '@optimizely/cms/utils';
import createComponentLoader from '@optimizely/cms/component-loader';
const loadModule = async (forItem, prefix, tag, componentLoader) => {
    const loader = resolve(componentLoader, createComponentLoader);
    const contentType = forItem.contentType;
    return loader.tryDynamicModuleAsync(contentType, prefix, tag);
};
export const loadAdditionalProps = async (forItem, prefix, tag) => {
    const m = await loadModule(forItem, prefix, tag);
    if (m?.loadAdditionalProps)
        return m.loadAdditionalProps(forItem);
    return null;
};
export const loadComponent = async (forItem, prefix, tag) => {
    return (await loadModule(forItem, prefix, tag))?.default;
};
//# sourceMappingURL=utils.js.map