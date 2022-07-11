import type { PropsWithChildren, ReactElement, ComponentType } from 'react'
import type { ContentAreaPropertyValue, PropertyContentArea } from '../models/property'
import type { IContent, IContentData } from '../models/icontent'
import React from 'react'
import { readValue, processValue } from '../util/property'
import ContentAreaItem, { ContentAreaItemContainer, ContentAreaItemContainerProps } from './ContentAreaItem'
import { useOptimizely, ReactV18 } from '../index'

export type KeyOfType<T, V> = keyof {
    [P in keyof T as T[P] extends V ? P : never ]: any
}

export type ContentAreaContainerProps = {
    dataEpiEdit ?: string
}
export type ContentAreaContainer = ComponentType<PropsWithChildren<ContentAreaContainerProps>>

export type ContentAreaProps<T extends IContent = IContent, I extends T | undefined = T | undefined> = {
    /**
     * The name of the ContentArea property, to be fetched from
     * the content and used to render the properties to make it
     * editable.
     */
    name : KeyOfType<T, PropertyContentArea>

    /**
     * The current language to render the content with
     */
    language ?: string

    /**
     * Override the default container used to wrap content area items
     * within
     */
    itemContainer ?: ContentAreaItemContainer

    /**
     * Override the default conatiner used to wrap the entire contentarea
     * within
     */
    container ?: ContentAreaContainer

    /**
     * If set to true, the contentarea won't render additional html elements
     * in edit mode, but expect the renderer to use dataEpi* properties to
     * output the needed props.
     */
    passEpiData ?: boolean
} & ({

    /**
     * The IContent item to read the property from. This value will be
     * ignored when you provide the value as well.
     */
    content: I

    /**
     * The value of the ContentArea property, if provided this takes
     * presendence over the content item.
     */
    value?: undefined

    /**
     * The scope used when dynamically loading the content, this is typically
     * the guidValue of the IContent containing the ContentArea
     */
    scope?: undefined
} | {
    content?: undefined,

    /**
     * The value of the ContentArea property, if provided this takes
     * presendence over the content item.
     */
    value: PropertyContentArea

    /**
     * The scope used when dynamically loading the content, this is typically
     * the guidValue of the IContent containing the ContentArea
     */
    scope: string
})

export function ContentArea<T extends IContent = IContentData>(props: PropsWithChildren<ContentAreaProps<T>>): ReactElement<any, any> | null
{
    const opti = useOptimizely()
    var isEditable = opti.inEditMode || opti.isEditable
    const myId = (React as ReactV18).useId()

    if (props.value === undefined && props.content === undefined)
        return <>{ props.children }</>
    if (!props.container)
        throw new Error("The ContentArea was unable to resolve the container")
    if (!props.itemContainer)
        throw new Error("The ContentArea was unable to resolve the item container")

    const propName : string = props.name.toString()
    const value = ((processValue(props.value) ?? readValue(props.content, props.name)) || []) as ContentAreaPropertyValue
    const language = props.language ?? opti.defaultBranch ?? '';
    const contentScope = props.scope ?? props.content?.contentLink.guidValue

    const editContentId = parseInt(opti?.editableContent?.id || opti?.currentContentId)
    //console.log("LIB ContentArea 1:", isEditable)
    if (isEditable && props.content?.contentLink?.id && editContentId) {
        //console.log("LIB ContentArea 1a:", props.content?.contentLink?.id, editContentId, props.content?.contentLink?.id === editContentId)
        isEditable = props.content?.contentLink?.id === editContentId
    }
    //console.log("LIB ContentArea 2:", isEditable)

    const ContainerElement = props.container
    const ItemContainerElement = props.itemContainer

    const items = value.map((item, idx) => {
        return <ContentAreaItem item={ item } key={`${ myId }-${ propName }-item-${ idx }`} itemContainer={ ItemContainerElement } language={ language } scope={ contentScope } passEpiData={ props.passEpiData } isEditable={ isEditable }/>
    } )

    if (!isEditable)
        return <ContainerElement>{ items }</ContainerElement>

    if (props.passEpiData)
        return <ContainerElement dataEpiEdit={ propName }>{ items }</ContainerElement>

    return <div className='content-area-edit' data-epi-edit={ propName }><ContainerElement>{ items }</ContainerElement></div>
}

ContentArea.displayName = "Optimizely CMS: Content Area"
ContentArea.defaultProps = {
    itemContainer: (props: PropsWithChildren<ContentAreaItemContainerProps>) => { return <div className='content-area-item' data-template={ props.displayOption }>{ props.children }</div>},
    container: (props: PropsWithChildren<ContentAreaContainerProps>) => { return <>{ props.children }</>},
    passEpiData: false
} as Partial<ContentAreaProps>

export default ContentArea