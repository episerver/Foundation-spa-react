import React, { Component, ReactNode, ReactNodeArray } from 'react';
import IContent from '../Models/IContent';
import ContentLink from '../Models/ContentLink';
import CmsComponent from './CmsComponent';
import Spinner, { SpinnerProps } from './Spinner';
import IEpiserverContext from '../Core/IEpiserverContext';

export interface LayoutProps {
    page?: ContentLink
    expandedValue?: IContent
    actionName?: string
    actionData?: any
    path?: string
    context: IEpiserverContext
    startPage?: IContent
}

export interface LayoutState {
    isContextLoading: boolean
}

export type LayoutComponent = new (props: LayoutProps) => Layout

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
        if (!this.hasStartPage()) {
            throw(new Error("No start page has been defined"));
        }

        const l = this as EpiserverLayout;
        if (l.layoutDidMount) l.layoutDidMount();
    }

    public readonly componentDidUpdate = (prevProps: LayoutProps, prevState: LayoutState): void => 
    {
        if (!this.hasStartPage()) {
            throw(new Error("No start page has been defined"));
        }

        const l = this as EpiserverLayout;
        if (l.layoutDidUpdate) l.layoutDidUpdate(prevProps, prevState);
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
        let contentLink : ContentLink;
        if (this.props.page) {
            contentLink = this.props.page as ContentLink;
            return <CmsComponent context={this.props.context} contentLink={ contentLink } expandedValue={this.props.expandedValue} actionName={this.props.actionName} actionData={this.props.actionData} />
        } else if (this.props.expandedValue) {
            contentLink = (this.props.expandedValue as IContent).contentLink;
            return <CmsComponent context={this.props.context} contentLink={ contentLink } expandedValue={this.props.expandedValue} actionName={this.props.actionName} actionData={this.props.actionData} />
        }
        return this.renderEmpty();
    }

    public renderSpinner() : ReactNodeArray | ReactNode | null
    {
        return Spinner.CreateInstance(this.getSpinnerProps());
    }

    public renderEmpty() : ReactNodeArray | ReactNode | null
    {
        return null;
    }

    protected getContext() : IEpiserverContext
    {
        return this.props.context;
    }

    protected isPageValid() : boolean
    {
        if (this.props.path === "/") return true; // Do not validate homepage
        if (this.props.path && this.props.page)
        {
            const pagePath = this.getContext().getEpiserverUrl(this.props.page, this.props.actionName);
            const path = this.getContext().getEpiserverUrl(this.props.path, this.props.actionName);

            return pagePath === path;
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