import { Component, ReactText } from 'react';
import { Method } from 'axios';
import IContent from './Models/IContent';
import ActionResponse from './Models/ActionResponse';
import ContentLink from './Models/ContentLink';
import { IEpiserverSpaContext } from './Spa';

/**
 * Base properties to be applied to every Episerver component
 */
export interface ComponentProps<T extends IContent> {
    /**
     * The IContent data object for this component
     */
    data: T

    /**
     * The width for this component
     */
    width?: number

    /**
     * The height for this component
     */
    height?: number

    /**
     * Additional classnames assigned to this component
     */
    className?: string

    /**
     * The unique identifier of this component
     */
    key?: ReactText

    /**
     * The link to the content item shown by this component
     */
    contentLink?: ContentLink

    /**
     * The type context to be used, typical values are null, empty string or "block"
     */
    contentType?: string

    /**
     * The property name shown by this component
     */
    propertyName?: string

    /**
     * The controller action name to be used
     */
    actionName?: string

    /**
     * The controller action data to be used
     */
    actionData?: any

    /**
     * The application context to be used
     */
    context: IEpiserverSpaContext

    /**
     * The current path being rendered
     */
    path?: string

    /**
     * The identifier of the component, if provided
     */
    id?: string
}

/**
 * Type do describe a generic EpiComponent type
 */
export interface EpiComponentType {
    new ( props : ComponentProps<IContent>) : EpiComponent<IContent>
}

/**
 * Base abstract class to be used by components representing an Episerver IContent component (e.g. Block, Page, Media, 
 * Catalog, Product, etc...)
 */
export abstract class BaseEpiComponent<P extends ComponentProps<IContent>, S = {}, SS = {}> extends Component<P, S, SS>
{
    /**
     * The component name as injected by the ComponentLoader
     */
    static displayName : string;

    protected currentComponentId : number;
    protected currentComponentGuid : string;

    public constructor (props : P)
    {
        super(props);
        this.currentComponentId = this.props.data.contentLink.id;
        this.currentComponentGuid = this.props.data.contentLink.guidValue;
        if (this.getInitialState) this.state = this.getInitialState();
        if (this.componentInitialize) this.componentInitialize();
    }

    protected getInitialState?(): S;
    protected componentInitialize?() : void;

    /**
     * Return if debug mode is active
     */
    protected isDebugActive() : boolean
    {
        return this.getContext().isDebugActive() === true;
    }

    /**
     * Returns true for OPE only
     */
    protected isEditable() : boolean
    {
        return this.getContext().isEditable();
    }
    
    /**
     * Returns true for OPE & Preview
     */
    protected isInEditMode() : boolean
    {
        return this.getContext().isInEditMode();
    }

    /**
     * Retrieve the ContentLink for this component
     */
    protected getCurrentContentLink() : ContentLink {
        return this.props.data.contentLink ? this.props.data.contentLink : this.props.contentLink;
    }

    protected getContext() : IEpiserverSpaContext
    {
        return this.props.context;
    }

    /**
     * Invoke a method on the underlying controller for this component, using strongly typed arguments and responses.
     * 
     * @param method The (Case sensitive) name of the method to invoke on the controller for this component
     * @param verb The HTTP method to use when invoking, defaults to 'GET'
     * @param args The data to send (will be converted to JSON)
     */
    protected invokeTyped<TypeIn, TypeOut>(method: string, verb?: Method, args?: TypeIn) : Promise<ActionResponse<TypeOut>>
    {
        return this.getContext().contentDeliveryApi().invokeTypedControllerMethod<TypeOut, TypeIn>(this.getCurrentContentLink(), method, verb, args);
    }

    /**
     * Invoke a method on the underlying controller for this component
     * 
     * @param method The (Case sensitive) name of the method to invoke on the controller for this component
     * @param verb The HTTP method to use when invoking, defaults to 'GET'
     * @param args The data to send (will be converted to JSON)
     */
    protected invoke(method: string, verb?: Method, args?: object) : Promise<ActionResponse<any>>
    {
        return this.getContext().contentDeliveryApi().invokeControllerMethod(this.getCurrentContentLink(), method, verb, args);
    }

    protected htmlObject(htmlValue : string) : any
    {
        return {
            __html: htmlValue
        };
    }

    protected navigateTo(toPage: string | ContentLink)
    {
        this.props.context.navigateTo(toPage);
    }
}

export default abstract class EpiComponent<P extends IContent, S={}, SS={}> extends BaseEpiComponent<ComponentProps<P>, S, SS> {}