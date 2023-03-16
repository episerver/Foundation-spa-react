import type { FunctionComponent, HTMLAttributes } from 'react'
import type { IContentComponent, IContent, IContentData } from '@optimizely/cms/models'
import type { FormContainerBlock } from 'schema'
import React, { useEffect, useRef } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { useContent} from '@optimizely/cms/use-content'
import { useEditMode } from '@optimizely/cms/context'
import { readValue as pv } from '@optimizely/cms/utils'
import { EditableField } from '@optimizely/cms/components'

import styles from "./FormContainerBlock.module.scss";

export type FormContainerProps = {

}

type FormsApiContainer<CT extends IContent = IContentData> = CT & {
    formModel: {
        assets: {
            css: string
            jquery: string
            originalJquery: string
            prerequisite: string
            viewModeJs: string
            [key: string]: string
        },

        /**
         * The HTML template needed to render the form
         */
        template: string
    }
}

export const FormContainerBlockComponent : IContentComponent<FormsApiContainer<FormContainerBlock>, FormContainerProps> = props =>
{
    const contentId = props.content?.contentLink.guidValue ?? '00000000-0000-0000-0000-000000000000'
    const fullFormData = useContent<FormsApiContainer<FormContainerBlock>>(contentId, undefined, undefined, props.content?.language.name || "en", "FullFormData")
    const formModel = fullFormData?.data?.formModel
    const title = pv(props.content, "title")
    const { inEditMode } = useEditMode()

    if (!formModel)
        return <div className='EPiServerFormsComponent EPiServerFormsPlaceholder' data-form-id={contentId}>
            { title ? <h1><EditableField field='title' inline>{ title }</EditableField></h1> : undefined }
            <p>Forms will be loaded client side only</p>
        </div>

    if (inEditMode)
        return <div className='EPiServerFormsComponent EPiServerFormsPlaceholder' data-form-id={contentId}>
            { title ? <h1><EditableField field='title' inline>{ title }</EditableField></h1> : undefined }
            <p>Forms are disabled in edit mode</p>
        </div>
    
    return <div className='EPiServerFormsComponent optiReact__form-block' data-form-id={contentId}>
        <Head>
            <style id={ `${ contentId }-css` }>{ formModel.assets.css }</style>
        </Head>
        <Script id={ `${ contentId }-jquery` } >{ formModel.assets.jquery }</Script>
        <Script id={ `${ contentId }-originalJquery` } >{ formModel.assets.originalJquery }</Script>
        <Script id={ `${ contentId }-prerequisite` } >{ formModel.assets.prerequisite }</Script>
        <Script id={ `${ contentId }-viewModeJs` } >{ formModel.assets.viewModeJs }</Script>
        { title ? <h1><EditableField field='title' inline>{ title }</EditableField></h1> : undefined }
        <FormTemplate className={ styles.EPiServerFormsContainer } tpl={formModel.template ?? ''}></FormTemplate>
    </div>
}

FormContainerBlockComponent.displayName = "CMS-Component: FormContainerBlock"
FormContainerBlockComponent.getContentFields = () => [ "title" ]

/**
 * Form Template component, which will both render and execute the HTML provided by the template
 * https://github.com/christo-pr/dangerously-set-html-content/blob/main/libs/dangerously-set-html-content/src/lib/dangerously-set-html-content.tsx
 */
type FormTemplateProps = HTMLAttributes<HTMLDivElement> & { tpl: string }
const FormTemplate : FunctionComponent<FormTemplateProps> = ({ tpl, dangerouslySetInnerHTML, ...rest }) => 
{
    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        try {
            if (!tpl || !divRef.current) throw "tpl prop cant't be null"
            const slotHtml = document.createRange().createContextualFragment(tpl) // Create a 'tiny' document and parse the html string
            divRef.current.innerHTML = '' // Clear the container
            divRef.current.appendChild(slotHtml) // Append the new content
        } catch (e) {
            console.error("Caught Error", e)
        }
      }, [tpl, divRef])
    
    return <div {...rest} ref={divRef} />
}

export default FormContainerBlockComponent