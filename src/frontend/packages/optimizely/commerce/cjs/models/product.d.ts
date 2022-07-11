import { Models } from '@optimizely/cms';
export declare type Product = Models.IContentData & {
    assets: string[];
    code: Models.StringProperty;
    seoUri: Models.StringProperty;
    displayName: Models.StringProperty;
    catalogId: Models.NumberProperty;
};
export default Product;
