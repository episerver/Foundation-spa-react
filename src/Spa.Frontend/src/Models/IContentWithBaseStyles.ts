import { CSSProperties } from 'react';
import { Taxonomy } from '@episerver/spa-core';

export type IContentWithBaseStyles<T extends Taxonomy.IContent = Taxonomy.IContent> = T & {
    margin ?: Taxonomy.Property.StringProperty
    padding ?: Taxonomy.Property.StringProperty
    blockRatio ?: Taxonomy.Property.StringProperty,
    backgroundColor ?: Taxonomy.Property.StringProperty,
    blockOpacity ?: Taxonomy.Property.NumberProperty
}
export const stringToTextAlign : (inValue: string) => CSSProperties["textAlign"] | undefined = (inValue) =>
{
    switch (inValue?.toLowerCase()) {
        case "start":
        case "end":
        case "left":
        case "right":
        case "center":
        case "justify":
        case "match-parent":
            return inValue.toLowerCase() as CSSProperties["textAlign"];
        default:
            return undefined;
    } 
}
export const readContainerStyles : (data: IContentWithBaseStyles) => [string[], CSSProperties] = (data) => {
    const cssProps : CSSProperties = {};
    const cssClasses : string[] = [];
    const margin = Taxonomy.Property.readPropertyValue(data, "margin");
    const padding = Taxonomy.Property.readPropertyValue(data, "padding");
    const blockRatio = Taxonomy.Property.readPropertyValue(data, "blockRatio");
    if (margin) cssClasses.push(margin);
    if (padding) cssClasses.push(padding);
    if (blockRatio) {
        const [ h, v ] = blockRatio.split(':', 2).map(x => Number.parseInt(x));
        const ratioPercent = (Math.round((v/h)*10000)/100).toString() + "%";
        cssProps.paddingBottom = ratioPercent;
    }
    cssProps.backgroundColor = Taxonomy.Property.readPropertyValue(data, "backgroundColor");
    cssProps.opacity = Taxonomy.Property.readPropertyValue(data, "blockOpacity") || 1.0;

    return [cssClasses, cssProps];
}

export default IContentWithBaseStyles;