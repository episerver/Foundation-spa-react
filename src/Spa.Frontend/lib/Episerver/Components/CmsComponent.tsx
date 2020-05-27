import React, { Component, ReactNode, ComponentType } from "react";
import { connect } from 'react-redux';
import { ComponentProps } from '../EpiComponent';
import IContent from "../Models/IContent";
import ContentLink, { ContentLinkService } from "../Models/ContentLink";
import Spinner from "./Spinner";
import ComponentLoader from "../Loaders/ComponentLoader";
import ComponentNotFound from "./Errors/ComponentNotFound";
import IEpiserverContext from '../Core/IEpiserverContext';
import EpiContext from "../Spa";
import StringUtils from '../Util/StringUtils';
import { TComponentType } from '../Loaders/ComponentLoader';

interface CmsComponentState { 
	hasError: boolean
	errorObject?: any
	component?: TComponentType
	componentName?: string
	componentIsUpdating: boolean
}

interface CmsComponentProps {
	/**
	 * The link to the content to be rendered in this component
	 */
	contentLink: ContentLink

	/**
	 * Context information
	 */
	contentType?: string

	/**
	 * 
	 */
	context: IEpiserverContext

	/**
	 * CSS Class to be added
	 */
	className?: string

	/**
	 * The data for the component, if it has been fetched before.
	 */
	expandedValue?: IContent
	
	/**
	 * The width of the component
	 */
	width?: number

	/**
	 * The height of the component
	 */
	height?: number

	/**
	 * The name of the property being rendered
	 */
	propertyName?: string

	actionName?: string

	actionData?: any

	path?: string
};

/**
 * The CMS Component provides the asynchronous loading of content and components needed to render an IContent
 * based (part of) the page.
 */
export class CmsComponent extends Component<CmsComponentProps, CmsComponentState> {
	/**
	 * The component loader to dynamically load the components
	 */
	protected readonly componentLoader: ComponentLoader;

	protected _unmounted : boolean = false;

	/**
	 * Dynamic property for accessing the Episerver SPA Context, first from the
	 * component properties, secondly from the global context.
	 * 
	 * @returns	{ IEpiserverSpaContext } The current context for the SPA
	 */
	protected get spaContext() : IEpiserverContext
	{
		return this.props.context || EpiContext;
	}

	/**
	 * Create a new CMS Component, which dynamically loads the application component
	 * for rendering.
	 * 
	 * @param props 
	 */
	public constructor(props : CmsComponentProps) {
		super(props);
		this.componentLoader = this.props.context.componentLoader();
		let componentName : string = '';
		let component: TComponentType | null = null;

		if (this.isExpandedValueValid()) {
			componentName = this.buildComponentName(this.props.expandedValue as IContent);
			component = this.componentLoader.getPreLoadedType(componentName, false);
		} else {
			if (this.spaContext.isDebugActive()) console.debug(`CmsComponent is awaiting full content`, this.props.contentLink)
			if (!this.props.context.isServerSideRendering() && this.props.contentLink?.id) {
				this.props.context.loadContentById(ContentLinkService.createApiId(this.props.contentLink));
			}
		}

		const hasError: boolean = false;
		const componentIsUpdating: boolean = false;

		this.state = {
			hasError,
			componentName,
			component: component || undefined,
			componentIsUpdating
		}
	}

	protected async loadComponent(iContent ?: IContent) : Promise<ComponentType<ComponentProps<IContent>>>
	{
		const content = iContent || this.props.expandedValue;
		if (!content) {
			Promise.reject("No content to be loaded specified");
		}
		const componentName : string = this.buildComponentName(content as IContent);
		return this.componentLoader.LoadType(componentName);
	}

	/**
	 * Build the actual properties array for the component
	 * 
	 * @param 	content 	The content item to generate the props for
	 */
	protected buildComponentProps(content: IContent) : ComponentProps<IContent>
	{
		return {
			data: content,
			contentLink: content.contentLink,
			className: this.props.className,
			height: this.props.height,
			width: this.props.width,
			propertyName: this.props.propertyName,
			contentType: this.props.contentType,
			key: `CmsComponent-Instance-${ content.contentLink.guidValue }`,
			actionName: this.props.actionName,
			actionData: this.props.actionData,
			context: this.props.context,
			path: this.props.path
		}
	}

	/**
	 * Create the name of the React Component to load for this CmsComponent
	 * 
	 * @param item The IContent to be presented by this CmsComponent
	 */
	protected buildComponentName(item : IContent) : string
	{
		const context : string = this.props.contentType || '';
		let baseName = item.contentType.map((s) => {
			return StringUtils.SafeModelName(s);
		}).join('/');
		if (context && context !== item.contentType.slice(0,1)[0]) {
			baseName = context + '/' + baseName;
		}
		return baseName;
	}

	/**
	 * Handle the attaching of this component to the virtual DOM to render it's contained
	 * IContent
	 */
	public componentDidMount()
	{
		if (!this.isComponentValid() && this.state.componentName) {
			this.updateComponent(this.state.componentName);
		}
	}

	public componentDidUpdate(prevProps: CmsComponentProps, prevState: CmsComponentState)
	{
		if (this.state.componentIsUpdating || prevState.componentIsUpdating) return; 
		const mustUpdate : boolean = prevProps.contentLink?.id !== this.props.contentLink.id;
		if (mustUpdate || !this.isComponentValid()) {
			this.setState({component: undefined, componentName: undefined, componentIsUpdating: true });
			const componentName : string = this.props.expandedValue ? this.buildComponentName(this.props.expandedValue) : '';
			this.updateComponent(componentName);
		}
	}

	protected updateComponent(componentName: string)
	{
		// If the component is in cache, use cached version and do not use promises
		if (this.componentLoader.isPreLoaded(componentName)) {
			this.setState({
				componentName,
				component: this.componentLoader.getPreLoadedType(componentName, true) as TComponentType,
				componentIsUpdating: false
			});
			return;
		}

		// Load component through promises
		const me = this;
		this.componentLoader.LoadType(componentName).then(cType => {
			if (!me._unmounted) me.setState({
				componentName,
				component: cType,
				componentIsUpdating: false
			});
		}).catch(reason => {
			const state : any = {
				componentName,
				component: ComponentNotFound,
				componentIsUpdating: false
			};
			if (!me._unmounted) me.setState(state)
		});
	}

	/**
	 * Check if the current expanded value is both set and relates to the current
	 * content reference.
	 */
	protected isExpandedValueValid() : boolean
	{
		if (!this.props.expandedValue) return false;
		return this.props.expandedValue.contentLink.guidValue === this.props.contentLink.guidValue;
	}

	protected isComponentValid() : boolean
	{
		if (this.isExpandedValueValid()) {
			const name = this.buildComponentName(this.props.expandedValue as IContent);
			return this.state.component?.displayName === 'Epi/ComponentNotFound' ||
				this.state.component?.displayName === name;
		}
		return false;
	}

	public componentDidCatch(error: any, errorInfo: any) : any
	{
		// Ignore caught errors
	}

	public static getDerivedStateFromError(error: any) : CmsComponentState
	{
		return {
			hasError: true,
			errorObject: error,
			component: undefined,
			componentName: undefined,
			componentIsUpdating: false
		}
	}

	public componentWillUnmount() {
		this._unmounted = true;
	}

	public render() : ReactNode | null
	{
		const spinnerId = `ssr-${ ContentLinkService.createApiId(this.props.contentLink) }`;
		if (this.state.hasError) {
			return <div className="alert alert-danger">An uncaught error occured!</div>
		}
		if (this.isComponentValid()) {
			const props : ComponentProps<IContent> = this.buildComponentProps(this.props.expandedValue as IContent);
			return React.createElement(this.state.component as TComponentType, props);
		}
		if (this.props.contentLink == null) {
			return <div className="alert alert-danger">No linked content</div>
		}
		return Spinner.CreateInstance({
			key: `CmsComponent-Spinner-${ spinnerId }`
		});
	}
}

type CmsComponentType = new (props : CmsComponentProps) => CmsComponent

let ExportableCmsComponent : CmsComponentType;
if (EpiContext.isServerSideRendering()) {
	ExportableCmsComponent = CmsComponent;
} else {
	ExportableCmsComponent = connect((state: any, ownProps: CmsComponentProps) : CmsComponentProps => {
		const id : string = ContentLinkService.createApiId(ownProps.contentLink);
		if (state.iContentRepo.items[id]) {
			return {
				...ownProps, 
				expandedValue: state.iContentRepo.items[id].content,
				path: state.ViewContext.currentPath
			};
		}
		return ownProps;
	})(CmsComponent) as unknown as CmsComponentType;
}
export default ExportableCmsComponent;