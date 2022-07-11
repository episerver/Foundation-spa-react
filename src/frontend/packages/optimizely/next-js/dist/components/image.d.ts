import React from 'react';
import type { ImageProps } from 'next/image';
import type { ContentReference } from '@optimizely/cms/models';
declare type Extend<Base, Extension> = Omit<Base, keyof Extension> & Extension;
declare type OptiImageProps = Extend<Omit<ImageProps, 'loader'>, {
    src: ContentReference;
}>;
export declare const Image: React.FC<OptiImageProps>;
export {};
