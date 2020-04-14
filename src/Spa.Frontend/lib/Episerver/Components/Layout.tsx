import React, { Component, ReactNode, ReactNodeArray, ComponentLifecycle } from 'react';
import IContent from '../Models/IContent';
import ContentLink from '../Models/ContentLink';
import CmsComponent from './CmsComponent';
import Spinner, { SpinnerProps } from './Spinner';
import EpiContext, { IEpiserverSpaContext } from '../Spa';

export interface LayoutProps {
    page?: ContentLink
    expandedValue?: IContent
    actionName?: string
    actionData?: any
    path?: string
    context: IEpiserverSpaContext
    startPage?: IContent
}

export interface LayoutState {
    isContextLoading: boolean
}

export interface LayoutComponent {
    new (props: LayoutProps) : Layout
}

export interface EpiserverLayout {
    componentDidMount() : void
    layoutDidMount?() : void
    componentDidUpdate(prevProps: LayoutProps, prevState: LayoutState): void
    layoutDidUpdate?(prevProps: LayoutProps, prevState: LayoutState): void
    render() : ReactNodeArray | ReactNode | null
    renderLayout() : ReactNodeArray | ReactNode | null
    renderSpinner() : ReactNodeArray | ReactNode | null
    renderEmpty() : ReactNodeArray | ReactNode | null
}

/**
 * Basic layout implementation, needed to enable implementations to provide their own layout.
 */
export default class Layout extends Component<LayoutProps, LayoutState> implements EpiserverLayout {
    /**
     * The initial state of the Layout
     */
    public state : LayoutState = {
        isContextLoading: false
    }

    public readonly componentDidMount = (): void => 
    {
        if (!this.isPageValid()) {
            console.log("Layout mount: no valid page", this.props.page, this.props.path);
        }
        if (!this.hasStartPage()) {
            console.log("Layout mount: no start page", this.props.startPage);
            throw("No start page");
        }

        if ((this as EpiserverLayout).layoutDidMount) (this as EpiserverLayout).layoutDidMount();
    }

    public readonly componentDidUpdate = (prevProps: LayoutProps, prevState: LayoutState): void => 
    {
        if (!this.isPageValid()) {
            console.log("Layout update: no valid page", this.props.page, this.props.path);
            //throw("No valid page");
        }
        if (!this.hasStartPage()) {
            console.log("Layout update: no start page", this.props.startPage);
            throw("No start page");
        }

        if ((this as EpiserverLayout).layoutDidUpdate) (this as EpiserverLayout).layoutDidUpdate(prevProps, prevState);
    }

    public readonly render = () : ReactNodeArray | ReactNode | null =>
    {
        if (/*this.isPageValid() &&*/ this.hasStartPage()) {
            return this.renderLayout();
        }
        if (this.state.isContextLoading) {
            return this.renderSpinner();
        }
        return null;
    }

    public renderLayout() : ReactNodeArray | ReactNode | null
    {
        return <CmsComponent context={this.props.context} contentLink={this.props.page} expandedValue={this.props.expandedValue} actionName={this.props.actionName} actionData={this.props.actionData} />
    }

    public renderSpinner() : ReactNodeArray | ReactNode | null
    {
        return Spinner.CreateInstance(this.getSpinnerProps());
    }

    public renderEmpty() : ReactNodeArray | ReactNode | null
    {
        return null;
    }

    protected isPageValid() : boolean
    {
        if (this.props.path == "/") return true; //Do not validate homepage
        if (this.props.path && this.props.page)
        {
            let pagePath = EpiContext.getEpiserverUrl(this.props.page, this.props.actionName);
            let path = EpiContext.getEpiserverUrl(this.props.path, this.props.actionName);

            return pagePath == path;
        }
        return false;
    }

    protected hasStartPage() : boolean
    {
        return this.props.startPage ? true : false;
    }

    protected getSpinnerProps() : SpinnerProps
    {
        return {
            key: "LayoutSpinner"
        }
    }
}