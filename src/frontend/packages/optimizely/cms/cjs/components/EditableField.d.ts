import { FunctionComponent, ComponentType, PropsWithChildren } from 'react';
/**
 * Component properties for the EditableField component
 */
export type Props = {
    /**
     * The name of the field, as defined within the content model
     */
    field: string;
    /**
     * When this property is set to true, the inline editing presentation
     * of the UI will be used to modify the content of this field.
     */
    inline?: boolean;
    /**
     * Any specific classname(s) to be added to the element providing
     * the editor controls
     */
    className?: string;
    /**
     * Allows the usage of dangerouslySetInnerHTML, where the container
     * is either a div, or the container used to activate edit-mode. Using
     * this allows the usage of inline on rich text fields
     */
    html?: string;
    /**
     * When set to true or false it will override the detection of the current
     * edit mode.
     */
    contentEditable?: boolean;
};
/**
 * The EditableField provides the needed wrapping - when in edit mode -
 * to make a field editable. It does not control the rendering of the field,
 * this should be provided as children to this Component
 *
 * @param props The rendering properties for this component
 * @returns
 */
export declare const EditableField: FunctionComponent<PropsWithChildren<Props>>;
/**
 * Higher order component to create a CMS Editable version of the provided component
 *
 * @param       Component   The component to make editable by the CMS
 * @returns     Component made editable in the CMS
 */
export declare const withOnPageEditing: <T>(Component: ComponentType<T>) => ComponentType<Omit<Props, 'html'> & T>;
export default EditableField;
