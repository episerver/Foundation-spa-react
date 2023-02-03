import type { IContentComponent } from '@optimizely/cms/models'
import type { TextBlock } from 'schema'
import { EditableField } from '@optimizely/cms/components'
import React from 'react';
import StructuredHtml from '@framework/foundation/cms/structuredhtml'
import componentFactory from '@components/shared/Utils/factory'
import { useContentEditMode } from '@optimizely/cms/context'

export const TextBlockComponent : IContentComponent<TextBlock> = props => { 
    const { contentEditable } = useContentEditMode(props.content)
    return <EditableField field='mainBody' contentEditable={ contentEditable }><StructuredHtml propertyData={ props.content?.mainBody } componentFactory={ componentFactory } /></EditableField>
    
}

TextBlockComponent.getContentFields = () => [ 'mainBody' ]
TextBlockComponent.displayName = "CMS-Component: TextBlock"

export default TextBlockComponent