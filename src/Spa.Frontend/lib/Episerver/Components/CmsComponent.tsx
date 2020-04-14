import React, { Component, ReactNode, ComponentType } from "react";
import { connect } from 'react-redux';
import { ComponentProps } from '../EpiComponent';
import IContent from "../Models/IContent";
import ContentLink, { ContentLinkService } from "../Models/ContentLink";
import Spinner from "./Spinner";
import ComponentLoader from "../Loaders/ComponentLoader";
import ComponentNotFound from "./Errors/ComponentNotFound";
import EpiContext, { IEpiserverSpaContext } from "../Spa";
import StringUtils from '../Util/StringUtils';

interface CmsComponentState { 
	hasError: boolean
	errorObject: any
	component: ComponentType<ComponentProps<IContent>>
	componentName: string
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
	context: IEpiserverSpaContext

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
	 * Create a new CMS Component, which dynamically loads the application component
	 * for rendering.
	 * 
	 * @param props 
	 */
	public constructor(props : CmsComponentProps) {
		super(props);
		this.componentLoader = this.props.context.componentLoader();
		let componentName : string = null;
		let component: ComponentType<ComponentProps<IContent>> = null;

		if (this.isExpandedValueValid()) {
			componentName = this.buildComponentName(this.props.expandedValue);
			component = this.componentLoader.getPreLoadedType(componentName, false);
		} else {
			if (!this.props.context.isServerSideRendering() && this.props.contentLink?.id) {
				this.props.context.loadContentById(ContentLinkService.createApiId(this.props.contentLink));
			}
		}

		this.state = {
			hasError: false,
			errorObject: null,
			componentName: componentName,
			component: component,
			componentIsUpdating: false
		}
	}

	protected async loadComponent(iContent ?: IContent) : Promise<ComponentType<ComponentProps<IContent>>>
	{
		let content = iContent || this.props.expandedValue;
		let componentName : string = this.buildComponentName(content);
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
		let context : string = this.props.contentType;
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
		if (!this.isExpandedValueValid()) {
			if(this.props.context.isDebugActive()) console.debug('Content not yet available, awaiting data for', this.props.contentLink?.id);
		} else if (!this.isComponentValid() && this.state.componentName) {
			this.updateComponent(this.state.componentName);
		}
	}

	public componentDidUpdate(prevProps: CmsComponentProps)
	{
		if (this.state.componentIsUpdating) return;
		let mustUpdate : boolean = (prevProps.contentLink?.id != this.props.contentLink.id) && (this.state.component?.displayName == 'Epi/ComponentNotFound');
		if (mustUpdate || (this.isExpandedValueValid() && !this.isComponentValid())) {
			if(this.props.context.isDebugActive()) console.info('Invalid component; updating', this.state.component?.displayName, this.buildComponentName(this.props.expandedValue), this.props.contentLink.id);
			this.setState({component: null, componentName: null, componentIsUpdating: true });
			let componentName : string = this.buildComponentName(this.props.expandedValue);
			this.updateComponent(componentName);
		}
	}

	protected updateComponent(componentName: string)
	{
		//If the component is in cache, use cached version and do not use promises
		if (this.componentLoader.isPreLoaded(componentName)) {
			this.setState({
				componentName: componentName,
				component: this.componentLoader.getPreLoadedType(componentName, true),
				componentIsUpdating: false
			});
			return;
		}

		//Load component through promises
		const me = this;
		if(this.props.context.isDebugActive()) console.info(`Loading component ${componentName}`, this.props.contentLink.id);
		this.componentLoader.LoadType(componentName).then(cType => {
			if(this.props.context.isDebugActive()) console.info(`The component ${componentName} has been loaded`, this.props.contentLink.id);
			if (!me._unmounted) me.setState({
				componentName: componentName,
				component: cType,
				componentIsUpdating: false
			});
		}).catch(reason => {
			if(me.props.context.isDebugActive()) console.warn(`Failed to load component ${ componentName }, reason`, reason, this.props.contentLink.id);
			let state : any = {
				componentName: componentName,
				component: ComponentNotFound,
				componentIsUpdating: false
			};
			state.component.displayName = componentName;
			if (!me._unmounted) me.setState(state)
		});
	}

	/**
	 * Check if the current expanded value is both set and relates to the current
	 * content reference.
	 */
	protected isExpandedValueValid() : boolean
	{
		return this.props.expandedValue &&
				this.props.expandedValue.contentLink.guidValue == this.props.contentLink.guidValue;
	}

	protected isComponentValid() : boolean
	{
		if (this.isExpandedValueValid()) {
			let name = this.buildComponentName(this.props.expandedValue);
			return this.state.component?.displayName == 'Epi/ComponentNotFound' ||
				this.state.component?.displayName == name;
		}
		return false;
	}

	public componentDidCatch(error: any, errorInfo: any) : any
	{
		console.error(error, errorInfo);
	}

	public static getDerivedStateFromError(error: any) : CmsComponentState
	{
		return {
			hasError: true,
			errorObject: error,
			component: null,
			componentName: null,
			componentIsUpdating: false
		}
	}

	public componentWillUnmount() {
		this._unmounted = true;
	}

	public render() : ReactNode | null
	{
		var spinnerId = `ssr-${ ContentLinkService.createApiId(this.props.contentLink) }`;
		if (this.state.hasError) {
			return <div className="alert alert-danger">An uncaught error occured!</div>
		}
		if (this.isExpandedValueValid() && this.isComponentValid()) {
			let props : ComponentProps<IContent> = this.buildComponentProps(this.props.expandedValue);
			return React.createElement(this.state.component, props);
		}
		if (this.props.contentLink == null) {
			return <div className="alert alert-danger">No linked content</div>
		}
		return Spinner.CreateInstance({
			key: `CmsComponent-Spinner-${ spinnerId }`
		});
	}
}

interface CmsComponentType {
	new (props : CmsComponentProps) : CmsComponent
}

let ExportableCmsComponent : CmsComponentType;
if (EpiContext.isServerSideRendering()) {
	ExportableCmsComponent = CmsComponent;
} else {
	ExportableCmsComponent = connect((state: any, ownProps: CmsComponentProps) : CmsComponentProps => {
		let id : string = ContentLinkService.createApiId(ownProps.contentLink);
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