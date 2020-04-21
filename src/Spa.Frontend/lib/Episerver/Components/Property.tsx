import React, { Component, ReactNode, ReactNodeArray } from 'react';
import IContentProperty, { ContentReferenceProperty } from '../Property';
import IContent, { IContentData, GenericProperty} from '../Models/IContent';
import { IEpiserverSpaContext } from '../Spa';
import { ContentLinkService } from 'Episerver/Models/ContentLink';
import CmsComponent from './CmsComponent';

export interface PropertyProps
{
    iContent: IContent
    property: string
    context: IEpiserverSpaContext
    className?: string
}

export default class Property extends Component<PropertyProps>
{
    protected hasProperty(): boolean
    {
        return (this.props.iContent as IContentData)[this.props.property] ? true : false;
    }

    protected getProperty() : GenericProperty
    {
        if (this.hasProperty()) {
            return (this.props.iContent as IContentData)[this.props.property];
        }
        return null;
    }

    protected isIContentProperty(p: GenericProperty): p is IContentProperty<any>
    {
        if (p && (p as IContentProperty<any>).propertyDataType && typeof((p as IContentProperty<any>).propertyDataType) == 'string') {
            return true;
        }
        return false;
    }

    public render() : ReactNode | ReactNodeArray | null
    {
        if (!this.hasProperty()) {
            return this.props.context.isDebugActive() ? <div>Property <span>{ this.props.property }</span> not present</div> : null;
        }
        let prop = this.getProperty();
        let propType = this.isIContentProperty(prop) ? prop.propertyDataType : typeof(prop);
        let stringValue : string;
        switch (propType) {
            case 'string':
                return this.isEditable() ? <span className={this.props.className} data-epi-edit={ this.props.property }>{ prop }</span> : (this.props.className ? <span className={ this.props.className }>{ prop }}</span> : prop);
            case 'PropertyLongString':
                stringValue = (prop as IContentProperty<string>).value;
                return this.isEditable() ? <span className={this.props.className} data-epi-edit={ this.props.property }>{ stringValue }</span> : (this.props.className ? <span className={ this.props.className }>{ stringValue }</span> : stringValue);
            case 'PropertyXhtmlString':
                stringValue = (prop as IContentProperty<string>).value;
                return this.isEditable() ? <div className={this.props.className} data-epi-edit={ this.props.property } dangerouslySetInnerHTML={ {__html: stringValue} }></div> : <div className={ this.props.className } dangerouslySetInnerHTML={ {__html: stringValue} } />;
            case 'PropertyContentReference':
                const link = (prop as ContentReferenceProperty).value;
                const expValue = (prop as ContentReferenceProperty).expandedValue;
                const item = <CmsComponent contentLink={link} expandedValue={expValue} context={this.props.context} className={this.props.className} />
                return this.isEditable() ? <div data-epi-edit={ this.props.property }>{item}</div> : item;
        }
        return this.props.context.isDebugActive() ? <div>Property type <span>{ propType }</span> not supported</div> : null;
    }

    /**
     * Helper method to ensure properties are only editable on the page/content they belong 
     * to, this is used to ensure properties from a StartPage are only made editable when the
     * current page is the StartPage.
     * 
     * Edit mode does not use SPA Routing, thus updating properties is not a main concern
     */
    protected isEditable() : boolean
    {
        if (!this.props.context.isEditable()) return false;

        const routedContent = this.props.context.getRoutedContent();
        const routedContentId = ContentLinkService.createApiId(routedContent.contentLink);
        const myContentId = ContentLinkService.createApiId(this.props.iContent.contentLink);
        return routedContentId == myContentId;
    }
}