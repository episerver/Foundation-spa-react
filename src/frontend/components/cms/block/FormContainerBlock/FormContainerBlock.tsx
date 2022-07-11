import type { IContentComponent, IContent, IContentData } from '@optimizely/cms/models'
import type { FormContainerBlock } from 'schema'
import React from 'react'
import Head from 'next/head'
import Script from 'next/script'

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
    return <div>Forms are not yet supported</div>
    /*const contentId = props.content?.contentLink.guidValue ?? '00000000-0000-0000-0000-000000000000'
    return <>
        <Head>
            <style id={ contentId }>{ props.content?.formModel.assets.css }</style>
        </Head>
        <Script id={ `${ contentId }-jquery-prerequisite` } strategy="lazyOnload">
            window.epi = window.epi || { "{ EPiServer: {} }" }
            { props.content?.formModel.assets.jquery }
            { props.content?.formModel.assets.originalJquery }
            { props.content?.formModel.assets.prerequisite }
        </Script>
        <div className='opti-form' dangerouslySetInnerHTML={{__html: props.content?.formModel.template ?? ''}}></div>
        <Script id={ `${ contentId }-viewModeJs` } strategy="lazyOnload">{ props.content?.formModel.assets.viewModeJs }</Script>
    </>*/
}

FormContainerBlockComponent.displayName = "CMS-Component: FormContainerBlock"

FormContainerBlockComponent.getContentFields = () => []

export default FormContainerBlockComponent