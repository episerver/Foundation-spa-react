import type { FunctionComponent, AllHTMLAttributes, ReactNode, ReactElement } from 'react'
import type { PropertyXhtmlString } from '@optimizely/cms/models'
import type { StructuredHtmlData, ParsedStructuredHtmlData, StructuredHtmlNode, StructuredHtmlElement, StructuredHtmlComponentFactory, StructuredHtemlElementComponents } from './types'
import { ContentComponent } from '@optimizely/cms/components'
import { Property } from '@optimizely/cms/utils'
import React, { createElement, Fragment, Suspense, useMemo } from 'react'
import { isStructuredHtml, parseStructuredHtmlData, tryParseStructuredHtmlData } from './utils'
import { decode as htmlDecode } from 'html-entities'

export type StructuredHtmlProps = {
    /**
     * The XHtml Property as received from the enhanced Optimizely 
     * ContentDelivery API.
     */
    propertyData: PropertyXhtmlString

    /**
     * The component to be used as wrapper if the received data 
     * is a string.
     */
    component?: StructuredHtemlElementComponents

    /**
     * A factory function that enables the implementation to create
     * bespoke implementations for specific HTML Tags received within
     * the data.
     */
    componentFactory?: StructuredHtmlComponentFactory
}

export const StructuredHtml : FunctionComponent<StructuredHtmlProps> = ({ propertyData, component, componentFactory }) => {
    const parsed = useMemo<ParsedStructuredHtmlData | string | null>(() => {
        const data : StructuredHtmlData | undefined | null = propertyData ? Property.processValue(propertyData) : null
        if (!data)
            return null

        const parsed = isStructuredHtml(data) ? tryParseStructuredHtmlData(data) : null
        return parsed ? parsed : (typeof data == 'string' ? data : null)
    }, [ propertyData ])
    
    if (!parsed)
        return null

    if (typeof parsed == 'string') {
        const c = component ?? 'div'
        const resolvedComponent = componentFactory ? componentFactory(c, {}) ?? { component: "div", props: {}} : { component: "div", props: {}}
        return createElement(resolvedComponent?.component ?? c, {
            ...resolvedComponent?.props,
            dangerouslySetInnerHTML: { __html: parsed }
        })
    }

    const { components } = parsed
    let idx = 0
    const pfx = Math.floor(Math.random() * 1000)
    return <Suspense>{ components.map(node => <HtmlRenderNode node={node} key={ `${ pfx }-structured-html-${ idx++ }`} componentFactory={ componentFactory } />) }</Suspense>
}
StructuredHtml.displayName = "Structured HTML Renderer"
StructuredHtml.defaultProps = {
    component: "div"
}

type HtmlRenderNodeProps = {
    node: StructuredHtmlNode
    locale?: string
    prefix?: string
    componentFactory?: StructuredHtmlComponentFactory
}
const HtmlRenderNode : FunctionComponent<HtmlRenderNodeProps> = ({ node, locale, prefix, componentFactory }) => {
    if (!node) return null
    if (node.componentType == "OptimizelyContent") {
        return <ContentComponent content={ node.content } contentType={ node.contentType } locale={ locale } prefix={ prefix } />
    } else if (node.componentType === "#text") {
        return <Fragment>{ htmlDecode(node.text) }</Fragment>
    } else {
        //console.log("Factory", componentFactory)
        const factoryResult = componentFactory ? componentFactory(node.componentType, node.attributes ?? {}) : undefined
        let idx = 0
        const pfx = `${( prefix ? `${prefix}-` : "")}${ Math.floor(Math.random() * 10000)}`
        const children = node.children?.map(child => <HtmlRenderNode node={ child as StructuredHtmlNode } key={ `${ pfx }-structured-html-${ idx++ }` } componentFactory={ componentFactory } />) ?? []
        const text = node.text

        if (factoryResult)
            return renderFromFactory(factoryResult, text, children)
        else
            return renderFromNode(node, text, children)
        
    }
}
HtmlRenderNode.displayName = "Structured HTML Node Renderer"
HtmlRenderNode.defaultProps = {
    locale: "en",
    prefix: "block"
}

export default StructuredHtml

function renderFromFactory(response: ReturnType<StructuredHtmlComponentFactory>, text?: string, children: ReactNode[] = []) : ReactElement<{}, string | React.JSXElementConstructor<any>>
{
    //console.log("Rendering using factory component");
    return createElement(response.component, response.props, text, ...children);
}
function renderFromNode(node: StructuredHtmlElement, text?: string, children: ReactNode[] = []) : ReactElement<{}, string | React.JSXElementConstructor<any>>
{
    //console.log(`Rendering directly: ${ node.componentType } `);
    const safeProps : AllHTMLAttributes<HTMLElement> = {}
    const attributes = node.attributes ?? {}
    for (let attrName of Object.getOwnPropertyNames(attributes)) {
        switch (attrName) {
            case "class":
                safeProps.className = attributes[attrName]
                break;
            default:
                safeProps[attrName as keyof AllHTMLAttributes<HTMLElement>] = attributes[attrName]
                break
        }
    }
    switch (node.componentType) {
        case 'br':
            return createElement(node.componentType, safeProps)
        case 'img':
            return createElement(node.componentType, safeProps)
        default:
            return createElement(node.componentType, safeProps, text, ...children)
    }
}