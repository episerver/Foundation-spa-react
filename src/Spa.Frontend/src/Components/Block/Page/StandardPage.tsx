import React, { FunctionComponent } from 'react';
import { StandardPageProps } from 'app/Models/Content/StandardPageData'
import Teaser from 'app/Components/Shared/Teaser'

/**
 * Create a block rendition of a Standard Page, this is done by rendering
 * a teaser block for this component.
 * 
 * @param props The component properties as injected by the SPA
 * @returns The block rendition of the page
 */
export const StandardPage : FunctionComponent<StandardPageProps> = (props) => <Teaser content={ props.data } className="standard-page-teaser">{ props.children }</Teaser>

export default StandardPage;