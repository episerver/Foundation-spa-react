import React from 'react';
import type { ImageProps } from 'next/image';
import type { ContentReference } from '@optimizely/cms/models';
type Extend<Base, Extension> = Omit<Base, keyof Extension> & Extension;
type OptiImageProps = Extend<Omit<ImageProps, 'loader'>, {
    src: ContentReference;
}>;
export declare const Image: React.FC<OptiImageProps>;
export {};
