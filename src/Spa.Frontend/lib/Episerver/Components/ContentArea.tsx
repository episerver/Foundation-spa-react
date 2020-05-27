import ContentLink from '../Models/ContentLink';
import React, { Component, ReactNode, ReactElement, ReactNodeArray } from 'react';
import CmsComponent from './CmsComponent';
import { ContentAreaProperty } from '../Property';
import IEpiserverContext from '../Core/IEpiserverContext';

/**
 * Definition of the ContentArea property value as used within the ContentDelivery API
 */
export interface ContentAreaPropertyValue extends Array<ContentAreaPropertyItem> {}

export interface ContentAreaSiteConfig {
    /**
     * The bindings between the display options and CSS classes to apply
     */
    displayOptions?: {
        [ displayOption : string ] : string
    }

    /**
     * Default CSS class to be added when rendering a block, defaults to "col"
     */
    defaultBlockClass?: string

    /**
     * Default CSS class to be added when rendering a row, defaults to "row"
     */
    defaultRowClass?: string

    /**
     * Default CSS class to be added to a container, defaults to "container"
     */
    defaultContainerClass?: string

    /**
     * If this class specified here is applied to a block, it'll cause the container 
     * to break to enable going full width
     */
    containerBreakBlockClass?: string

    /**
     * Set the type of component for the items within this area, this gets passed to the 
     * contentType attribute of the CmsComponent. The CmsComponent will prefix the reported 
     * type from Episerver with this value, if it does not start with this value already.
     * 
     * Defaults to: Block
     */
    itemContentType?: string

    /**
     * If set to "true", the components will not be wrapped in div elements and directly
     * outputted.
     */
    noWrap?: boolean

    /**
     * If set to "true", the components will also be wrapped in a container div, defaulting
     * to the bootstrap "container"-class. If noWrap has been set to true, setting this has
     * no effect
     */
    addContainer?: boolean
}

/**
 * A single item within an ContentArea, as returned by the ContentDelivery API
 */
interface ContentAreaPropertyItem {
    contentLink: ContentLink
    displayOption: string
    tag: string
}

interface ContentAreaProps extends ContentAreaSiteConfig {
    /**
     * The ContentArea property from the IContent, which must be rendered by this
     * component.
     */
    data: ContentAreaProperty

    /**
     * The Episerver Context used for rendering the ContentArea
     */
    context: IEpiserverContext

    /**
     * The name of the ContentArea property, if set this enables On Page Editing for
     * the content-area.
     */
    propertyName?: string
}

export default class ContentArea extends Component<ContentAreaProps> 
{
    public render() : ReactNode | null
    {
        // Return the children if there's no components
        if (!this.props.data || !this.props.data.value) return this.props.children || this.renderNoChildren();

        // Render the actual components
        const components : ReactElement[] = this.props.data.value.map(this.renderComponent.bind(this));
        if (this.props.noWrap === true) {
            if (this.props.propertyName && this.props.context.isEditable()) {
                return <div data-epi-edit={ this.props.propertyName }>{ components }</div>;
            }
            return components;
        }

        // If there's no container, just output the row
        const rowClass = `content-area ${ this.getConfigValue('defaultRowClass', 'row') }`;
        if (!this.props.addContainer) {
            if (this.props.context.isEditable()) {
                return <div className={rowClass} data-epi-edit={ this.props.propertyName }>{ components }</div>
            }
            return <div className= {rowClass }>{ components }</div>
        }

        const containerBreakBlockClass = this.getConfigValue('containerBreakBlockClass', undefined);
        const containerClass = this.getConfigValue('defaultContainerClass', 'container');
        if (!containerBreakBlockClass) {
            return <div className={containerClass}>
                <div className={rowClass} data-epi-edit={ this.props.context.isEditable() ? this.props.propertyName : null}>{ components }</div>
            </div>
        }

        const containers: {
            isContainer: boolean,
            components: ReactNodeArray | ReactElement[]
        }[] = [{ isContainer: true, components: []}];
        let containerIdx : number = 0;
        components.forEach(c => {
            const classNames : string = c.props.className;
            if (classNames.indexOf(containerBreakBlockClass) >= 0) {
                if (containers[containerIdx].components.length === 0) {
                    containers[containerIdx].isContainer = false;
                    containers[containerIdx].components.push(c);
                } else {
                    containerIdx++;
                    containers[containerIdx] = { isContainer: false, components: [c]};
                }
                containerIdx++;
                containers[containerIdx] = { isContainer: true, components: []};
            } else {
                containers[containerIdx].components.push(c);
            }
        });
        const groupedComponents = containers.map((cItem, idx) => {
            if (cItem.isContainer) {
                return <div className={containerClass} key={ `ContentArea-${this.props.propertyName}-item-${idx}` }>
                    <div className={rowClass}>
                        { cItem.components }
                    </div>
                </div>
            } else if (cItem.components.length > 1) {
                return <div key={ `ContentArea-${this.props.propertyName}-item-${idx}` }>{ cItem.components }</div>
            } else {
                return cItem.components[0];
            }
        });
        if (this.props.context.isEditable()) {
            return <div data-epi-edit={ this.props.propertyName }>{ groupedComponents }</div>
        }
        return groupedComponents;
    }

    protected renderComponent(item: ContentAreaPropertyItem, idx: number) : ReactElement
    {
        // Get expanded value
        let expandedValue;
        if (this.props.data.expandedValue) {
            expandedValue = this.props.data.expandedValue[idx];
        }

        // Build component
        const component = <CmsComponent context={this.props.context} contentLink={ item.contentLink } contentType={ this.getComponentType() } key={ item.contentLink.guidValue } expandedValue={ expandedValue } />;

        // Return if no wrapping
        if (this.props.noWrap === true) {
            if (this.props.context.isEditable()) {
                return <div data-epi-block-id={ item.contentLink.id } key={ item.contentLink.guidValue+"-container"}>{ component }</div>
            }
            return component
        }

        // Build wrapper element
        const displayOption : string = item.displayOption || "default";
        const props : any = {
            "data-displayoption": displayOption,
            "data-tag": item.tag,
            "className": this.getBlockClasses(displayOption).join(' '),
            "key": `${item.contentLink.guidValue}-container`,
            "children": component
        };
        if (this.props.context.isEditable()) props["data-epi-block-id"] = item.contentLink.id;
        return React.createElement('div', props);
    }

    protected renderNoChildren() 
    {
        if (this.props.context.isEditable()) {
            return <div data-epi-edit={ this.props.propertyName }><div className="alert alert-info m-5">There're no blocks in <i>{ this.props.propertyName || 'this area' }</i></div></div>
        }
        return <div />
    }

    protected getBlockClasses(displayOption: string) : string[] {
        const cssClasses : string[] = ['block'];
        const displayOptions = this.getConfigValue('displayOptions', {}) || {};
        if (displayOptions[displayOption]) {
            cssClasses.push(displayOptions[displayOption]);
        } else {
            cssClasses.push(this.getConfigValue('defaultBlockClass', 'col') as string);
        }
        return cssClasses;
    }

    /**
     * Retrieve the ContentArea configuration, as the global configuration overridden by the
     * instance configuration.
     */
    protected getConfig() : ContentAreaSiteConfig
    {
        const globalConfig = this.props.context.config()?.contentArea || {};
        return {
            ...globalConfig,
            ...this.props
        };
    }

    protected getConfigValue<K extends keyof ContentAreaSiteConfig>(propName: K, defaultValue?: ContentAreaSiteConfig[K]) : ContentAreaSiteConfig[K]
    {
        const cfg = this.getConfig();
        if (cfg[propName]) {
            return cfg[propName]
        }
        return defaultValue
    }

    protected getComponentType()
    {
        const cfg = this.getConfig();
        return cfg.itemContentType || "Block";
    }
}