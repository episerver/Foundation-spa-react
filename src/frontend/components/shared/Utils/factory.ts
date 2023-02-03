import type { StructuredHtmlComponentFactory, DomMap, FactoryResult } from "@framework/foundation/cms/structuredhtml/types"
import type { ComponentPropsWithoutRef, ComponentType } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Image } from '@optimizely/next-js/components'

type MyMap = { 
    h1: typeof Typography,
    h2: typeof Typography,
    h3: typeof Typography,
    h4: typeof Typography,
    h5: typeof Typography,
    h6: typeof Typography,
    p: typeof Typography,
    div: typeof Box,
    img: typeof Image
}
type ReturnedComponent<C extends ComponentType = ComponentType> = { component: C, props: ComponentPropsWithoutRef<C> } 
type ReturnData<K extends keyof DomMap> = FactoryResult<MyMap>[K] extends ComponentType ? ReturnedComponent<FactoryResult<MyMap>[K]> : undefined

/**
 * This factory performs the transformation from the raw output of the ContentDelivery API
 * into the structured data that uses the components/design system created within this frontend.
 * 
 * @param       tag             The HTML Tag used by the editor when creating the content
 * @param       attributes      The Attributes given to the tag by the editor within the rich text editor
 * @returns     The tranformed data
 */
function factoryFunction<K extends keyof DomMap>(tag: K, attributes: ComponentPropsWithoutRef<K>) : ReturnData<K>
{
    var props : any = attributes;
    if (props.style) {
        props.sx = props.style
        delete props.style
    }
    switch (tag) {
        case 'h1':
            return { component: Typography, props: { variant: "h1", ...props }} as ReturnData<K>
        case 'h2':
            return { component: Typography, props: { variant: "h2", ...props }} as ReturnData<K>
        case 'h3':
            return { component: Typography, props: { variant: "h3", ...props }} as ReturnData<K>
        case 'h4':
            return { component: Typography, props: { variant: "h4", ...props }} as ReturnData<K>
        case 'h5':
            return { component: Typography, props: { variant: "h5", ...props }} as ReturnData<K>
        case 'h6':
            return { component: Typography, props: { variant: "h6", ...props }} as ReturnData<K>
        case 'p': {
            var paragraphProps : ComponentPropsWithoutRef<typeof Typography> = props
            paragraphProps.variant = "body1"
            paragraphProps.sx = { mb: 2 }
            return { component: Typography, props: paragraphProps } as ReturnData<K>
        }
        case 'div':
            return { component: Box, props: { ...props }} as ReturnData<K>
        case 'img': {
            var imgProps : ComponentPropsWithoutRef<typeof Image> = props
            return { component: Image, props: imgProps } as ReturnData<K>
        }
        default:
            return undefined as ReturnData<K>
    }
}

export type MappedFactory = StructuredHtmlComponentFactory<MyMap>

/**
 * This factory performs the transformation from the raw output of the ContentDelivery API
 * into the structured data that uses the components/design system created within this frontend.
 * 
 * @param       tag             The HTML Tag used by the editor when creating the content
 * @param       attributes      The Attributes given to the tag by the editor within the rich text editor
 * @returns     The tranformed data
 */
export const factory : MappedFactory = factoryFunction
export default factory