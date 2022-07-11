import type { FunctionComponent } from 'react'
import React, { createElement } from 'react'

type HtmlContentProps = { 
    html: string, 
    component?: string
}

/**
 * Helper wrapper to inject editor generated HTML content, without causing
 * issues with Hydration from @mui components.
 * 
 * @param props 
 * @returns 
 */
export const HtmlContent : FunctionComponent<HtmlContentProps> = props => {
    const c = props.component ?? 'div'
    return createElement(c, {
        dangerouslySetInnerHTML: { __html: props.html }
    })
}
HtmlContent.defaultProps = {
    component: 'div'
}

export default HtmlContent