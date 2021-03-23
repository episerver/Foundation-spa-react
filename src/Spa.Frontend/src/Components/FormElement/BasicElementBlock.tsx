import React from 'react';
import { ContentDelivery, Taxonomy, Services } from '@episerver/spa-core';
import { Label } from 'reactstrap';

/**
 * 
 */
export type BasicElementBlockProps = {

    /**
     * A list of validators to apply to the entered value
     */
    validators: ContentDelivery.StringProperty

    /**
     * The information for the property
     */
    description: ContentDelivery.StringProperty

    /**
     * Label
     *
     * No description available
     */
    label: ContentDelivery.StringProperty

    /**
     * PlaceHolder
     *
     * No description available
     */
    placeHolder: ContentDelivery.StringProperty

    /**
     * ContentLink
     */
    contentLink: Taxonomy.ContentLink
}

export const BasicElementBlock : React.FunctionComponent<BasicElementBlockProps> = (props) => {
    let fieldId : string = `__field_${Services.ContentLink.createApiId(props.contentLink)}`;
    let fieldName : string = fieldId;
    let fieldInfoId : string = `${ fieldId }_Description`;
    const labelComponent = props.label?.value ? <label htmlFor={ fieldName }>{ props.label?.value }</label> : null;

    return <div className="form-group">
        { labelComponent }
    </div>
}
export default BasicElementBlock;