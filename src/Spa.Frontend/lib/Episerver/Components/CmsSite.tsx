//Import libraries
import React, {ReactNode, ReactNodeArray, Component} from 'react';
import Helmet from 'react-helmet';
import { Provider, connect } from 'react-redux';

//Import Episerver CMS
import Layout, { LayoutComponent, LayoutProps } from './Layout';
import IContent from '../Models/IContent';
import ContentLink from '../Models/ContentLink';
import Website from '../Models/Website';
import { IEpiserverSpaContext } from '../Spa';
import IContentRepository, { IContentRepoState, IContentActionFactory } from '../Repository/IContent';
import ServerContext, { isSerializedIContent, isSerializedWebsite, isSerializedContentLink } from '../ServerSideRendering/ServerContext';
import Spinner from './Spinner';
import ComponentPreLoader, { IComponentPreloadList } from 'Episerver/Loaders/ComponentPreLoader';

/**
 * Declare the context created by the Episerver Javascript ViewEngine, for both
 * initial data as well as server side rendering.
 */
declare let __INITIAL__DATA__ : ServerContext;

/**
 * Define the property structure for the CmsSite component
 */
interface CmsSiteProps {
    context: IEpiserverSpaContext
    path?: string
}

/**
 * The current state of the CmsSite
 */
interface CmsSiteState {
    isStateLoading: boolean;
}

/**
 * CmsSite Container component
 */
export default class CmsSite extends Component<CmsSiteProps, CmsSiteState>
{
    constructor(props: CmsSiteProps) {
        super(props);
        this.state = { isStateLoading: false }
    }

    public componentDidMount() : void
    {
        const me : CmsSite = this;
        this.setState({isStateLoading: true});
        this.initializeWebsiteAndPage().finally(() => {
            me.setState({isStateLoading: false});
        });
    }

    protected async initializeWebsiteAndPage() : Promise<boolean>
    {
        const me : CmsSite = this;
        try {
            const ws = await this.props.context.loadCurrentWebsite();
            me.logMessage(`Initialized website ${ws.name} with id ${ws.id}`);
            const c = await me.props.context.loadContentByRef("startPage");
            me.props.context.dispatch(IContentActionFactory.registerPaths(c, ['/']));
            me.logMessage(`Initialized start page ${ c.name } with id ${ c.contentLink.id } from ${ c.contentLink.providerName || 'Episerver CMS' }`);
            const cPath = me.props.context.getCurrentPath();
            if (!(cPath == '/' || cPath == c.contentLink.url)) {
                const cPage = await me.props.context.loadContentByPath(cPath);
                if (cPage.contentLink.url != cPath) {
                    me.props.context.dispatch(IContentActionFactory.registerPaths(cPage, [cPath]));
                }
                me.logMessage(`Initialized page ${ cPage.name } with id ${ cPage.contentLink.id } from ${ cPage.contentLink.providerName || 'Episerver CMS'}`);
            } else {
                me.logMessage('Initialized current page from start page');
            }
            return true;
        }
        catch (e) {
            return false;
        }
    }

    protected logMessage(msg: any) : void
    {
        if (this.props.context.isDebugActive())
        {
            //console.log.apply(console, arguments);
            console.log(msg);
        }
    }

    public render() : ReactNode {
        if (this.props.context.isServerSideRendering()) {
            return this.renderDisconnected();
        }
        return this.renderConnected();
    }

    protected renderDisconnected() : ReactNodeArray
    {
        if (this.props.context.isDebugActive()) console.debug('Rendering disconnected layout');
        const MyLayout = this.getLayout();
        const myStartPage : IContent = this.getInitialStartPage();
        const myContentLink : ContentLink = this.getInitialContentLink();
        const myContent : IContent = this.getInitialIContent();
        return [<Helmet key="main-helmet-container"/>, <MyLayout key="main-layout" context={this.props.context} path={ __INITIAL__DATA__.Path } page={ myContentLink } expandedValue={ myContent } startPage={ myStartPage } />]
    }

    /**
     * Render the entire site using a layout connected to the Redux store
     */
    protected renderConnected() : ReactNode
    {
        if (this.isStateValid()) {
            if (this.props.context.isDebugActive()) console.debug('Creating connected layout');
            let ConnectedLayout = connect(this.buildLayoutPropsFromState.bind(this))(this.getLayout());
            if (this.props.context.isDebugActive()) console.debug('Rendering connected layout');
            return <Provider store={ this.props.context.getStore() }><Helmet/><ConnectedLayout context={this.props.context} /></Provider>;
        } else {
            if (this.props.context.isDebugActive()) console.debug('Awaiting valid state for rendering the layout');
            return Spinner.CreateInstance({});
        }
    }

    protected buildLayoutPropsFromState(state: any, ownProps: LayoutProps) : LayoutProps
    {
        try {
            let path : string = state.ViewContext.currentPath;
            let idx = state.iContentRepo.paths[path];
            if (!idx) {
                console.warn("Path not found in state, sending empty to layout");
                return {...ownProps, path: path, page: null, expandedValue: null, startPage: null};
            }
            let contentLink : ContentLink;
            let contentItem : IContent;
            let startPage : IContent;
            contentItem = state.iContentRepo.items[idx].content;
            contentLink = contentItem.contentLink;
            let startIdx = state.iContentRepo.refs['startPage'];
            if (startIdx && state.iContentRepo.items[startIdx]) {
                startPage = state.iContentRepo.items[startIdx].content;
            }
            let newProps : LayoutProps = { 
                ...ownProps,
                page: contentLink,
                expandedValue: contentItem,
                path: path,
                startPage: startPage
            }
            return newProps;
        } catch (e) {
            if (this.props.context.isDebugActive()) console.warn('Error building layout properties', e, ownProps);
        }
        return ownProps;
    }

    protected isStateValid() : boolean
    {
        return this.hasWebsite() && this.hasStartPage();
    }

    protected hasStartPage() : boolean
    {
        let totalState = this.props.context.getStore().getState();
        let iContentState : IContentRepoState = totalState[IContentRepository.StateKey];

        let spId = iContentState.refs["startPage"];
        if (spId && iContentState.items[spId]) {
            return true;
        }
        return false;
    }

    protected hasWebsite() : boolean
    {
        let totalState = this.props.context.getStore().getState();
        let iContentState : IContentRepoState = totalState[IContentRepository.StateKey];
        
        if (!iContentState.website) return false;

        return true;
    }

    /**
     * Retrieve the Layout from the the current context of the CMS Site
     */
    protected getLayout() : LayoutComponent
    {
        if (this.props.context.config().layout) {
            return this.props.context.config().layout;
        }
        return Layout;
    }

    protected getInitialIContent() : IContent
    {
        if (isSerializedIContent(__INITIAL__DATA__.IContent)) {
            return JSON.parse(__INITIAL__DATA__.IContent);
        }
        return __INITIAL__DATA__.IContent;
    }

    protected getInitialStartPage() : IContent
    {
        if (isSerializedIContent(__INITIAL__DATA__.StartPageData)) {
            return JSON.parse(__INITIAL__DATA__.StartPageData);
        }
        return __INITIAL__DATA__.StartPageData;
    }

    protected getInitialWebsite() : Website
    {
        if (isSerializedWebsite(__INITIAL__DATA__.Website)) {
            return JSON.parse(__INITIAL__DATA__.Website);
        }
        return __INITIAL__DATA__.Website;
    }

    protected getInitialContentLink() : ContentLink
    {
        if (isSerializedContentLink(__INITIAL__DATA__.ContentLink)) {
            return JSON.parse(__INITIAL__DATA__.ContentLink);
        }
        return __INITIAL__DATA__.ContentLink;
    }
}