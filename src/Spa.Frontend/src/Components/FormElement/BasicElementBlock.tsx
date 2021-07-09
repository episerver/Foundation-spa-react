import React from 'react';
import { ContentDelivery, Taxonomy, Services } from '@episerver/spa-core';

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
    const fieldId : string = `__field_${Services.ContentLink.createApiId(props.contentLink)}`;
    const fieldName : string = fieldId;
    const fieldInfoId : string = `${ fieldId }_Description`;
    const labelText = Taxonomy.Property.isVerboseProperty(props.label) ? props.label.value : props.label;
    const labelComponent = labelText ? <label htmlFor={ fieldName } className="form-label">{ labelText }</label> : null;

    return <div className="form-group">
        { labelComponent }
    </div>
}
export default BasicElementBlock;