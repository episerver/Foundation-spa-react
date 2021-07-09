import React, { FunctionComponent as FC, PropsWithChildren as PWC, ReactElement as RE } from 'react';
import { Taxonomy, Components } from '@episerver/spa-core';

import "./HeaderImage.scss";

export type HeaderImageProps<ContentType extends Taxonomy.IContent = Taxonomy.IContent> = {
    content: ContentType,
    title: keyof ContentType,
    background: keyof ContentType,
    className?: string
}

export type HeaderImageComponent = FC<HeaderImageProps> & {
    <ContentType extends Taxonomy.IContent = Taxonomy.IContent>(props: PWC<HeaderImageProps<ContentType>>, context ?: any) : RE<any, any> | null
};

export const HeaderImage : HeaderImageComponent = <T extends Taxonomy.IContent = Taxonomy.IContent>(props: PWC<HeaderImageProps<T>>) => {
    return <div className={`header-image${ props.className ? " " + props.className : ""}`}>
        <div className="header-image-container">
            <Components.Property iContent={props.content} field={ props.background } />
            <h1><Components.Property iContent={ props.content } field={ props.title } /></h1>
        </div>
    </div>;
}

export default HeaderImage;