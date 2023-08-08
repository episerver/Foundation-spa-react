import type { ComponentType, ComponentPropsWithoutRef as ComponentProps } from 'react'
import type { ContentLink } from '@optimizely/cms'

export type BaseStructuredHtmlData = {
    contents?: ContentLink[]
    data: string
    errors?: string[]
}

export type StructuredHtmlData = string | BaseStructuredHtmlData

export type ParsedStructuredHtmlData = BaseStructuredHtmlData & {
    components: StructuredHtmlNode[]
}

export type StructuredHtmlNode = StructuredHtmlElement | StructuredHtmlText | StructuredHtmlComponent

export type StructuredHtmlElement = {
    componentType: StructuredHtemlElementComponents
    attributes?: StructuredHtmlElementAttributes
    children?: StructuredHtmlNode[]
    text?: string
}
export type StructuredHtmlText = {
    componentType: "#text"
    text: string
}

export type StructuredHtmlElementAttributes = Record<string, string>

export type StructuredHtmlComponent = {
    componentType: "OptimizelyContent"
    /**
     * The Numeric iden
     */
    contentId: string
    content: string
    contentType: string[]
    text?: string
}
export type StructuredHtemlElementComponents = keyof DomMap
export type DomMap = JSX.IntrinsicElements
export type FactoryMap = Partial<{
    [ tagName in StructuredHtemlElementComponents ]: ComponentType<any>
}>
export type FactoryResult<F extends FactoryMap> = F & {
    [ tag in keyof Omit<DomMap, keyof F>]: undefined
}

/**
 * The component factory that allows you to replace the standard html 
 * components that are returned by the ContentDelivery API. It does
 * require you to transform / forward the properties received.
 * 
 * Return undefined for those HTML components you do not want to replace
 * using the factory.
 * 
 * The component you return must support the following:
 * - Text/components added as children
 * - Raw HTML added using dangerouslySetInnerHTML
 */
export type StructuredHtmlComponentFactory<F extends FactoryMap = {}> = 
    <K extends keyof DomMap>(tagName: K, props: ComponentProps<K>) => 
    FactoryResult<F>[K] extends ComponentType ? 
        { component: FactoryResult<F>[K], props: ComponentProps<FactoryResult<F>[K]> } : 
        undefined