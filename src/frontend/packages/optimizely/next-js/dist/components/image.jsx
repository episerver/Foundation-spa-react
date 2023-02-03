import React from 'react';
import NextJsImage from 'next/image';
import { OptimizelyImageLoader } from '..';
import { ContentReference as CRUtils } from '@optimizely/cms/utils';
export const Image = props => {
    let newSrc = CRUtils.createContentUrl(props.src) ?? "#image";
    const imgProps = {
        ...props,
        src: newSrc,
        loader: OptimizelyImageLoader
    };
    return <NextJsImage {...imgProps}/>;
};
Image.displayName = "Optimizely CDN Image Delivery";
//# sourceMappingURL=image.jsx.map