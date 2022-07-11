import type { FunctionComponent, ReactElement } from 'react';
import type { IContent, ContentTypePath } from '../models';
import React from 'react';
export declare type ContentComponentProps = ({
    /**
     * The content identifier of the content item to load. This
     * content item must have the same contentType as provided
     * for the component to render.
     *
     * The result of loading this content item will be passed to the
     * component performing the actual rendering.
     */
    content: string;
    /**
     * The content type as reported by the Content Delivery API
     * client.
     *
     * This value will not be passed to the component that performs
     * the actual rendering.
     */
    contentType: ContentTypePath;
} | {
    /**
     * The pre-loaded content item to be rendered by this component,
     * it will take the content type from the content to determine
     * the component needed for rendering.
     *
     * This value will be passed to the component performing the actual
     * rendering.
     */
    content: IContent;
}) & {
    /**
     * The prefix to ensure that the right template is used, even when
     * there's no tag set.
     */
    prefix?: string;
    /**
     * The rendering tag as set on the content-area - used to enable
     * editors to switch templates.
     */
    tag?: string;
    /**
     * The loader to use, if not set the children will be used
     */
    loader?: ReactElement;
    /**
     * The current locale to use when rendering the component
     */
    locale?: string;
    /**
     * Additional properties can be added to Content
     */
    [key: string]: any;
};
/**
 * React helper component enable both server side and client side rendering
 * of Optimizely content, without specifying the actual component that will
 * perform the rendering.
 *
 * @param       props       The component properties
 * @returns     The rendered component
 */
export declare const ContentComponent: FunctionComponent<ContentComponentProps>;
declare const _default: React.ComponentType<ContentComponentProps>;
export default _default;
