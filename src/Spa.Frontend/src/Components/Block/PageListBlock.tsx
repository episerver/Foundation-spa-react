import React, {ReactNode, ReactNodeArray, CSSProperties} from 'react';
import EpiComponent from 'episerver/EpiComponent';
import IContent from 'episerver/Models/IContent';
import PageListBlockData, { PageListBlockProps } from 'app/Models/Content/PageListBlockData';
import { CmsComponent } from 'episerver/Components/CmsComponent';
import IContentWithTeaser, { isIContentWithTeaser } from 'Models/IContentWithTeaser';
import Link from 'episerver/Components/Link';
import Property from 'episerver/Components/Property';
import './PageListBlock/GridView.scss';
import Teaser from 'app/Components/Shared/Teaser';
import { ContentLinkService } from 'episerver/Models/ContentLink';

interface PageListPreviewViewModel {
    page: IContent
    template: string
    previewOption: string
    showIntroduction: boolean
    showPublishDate : boolean
}

interface PageListBlockViewModel {
    heading: string
    pages: Array<PageListPreviewViewModel>
    showIntroduction: boolean
    showPublishDate: boolean
    padding: string
    currentBlock: PageListBlockData
}



interface PageListBlockState {
    isLoading: boolean
    pages: Array<PageListPreviewViewModel>
}

export default class PageListBlock extends EpiComponent<PageListBlockData, PageListBlockState>
{
    protected getInitialState() : PageListBlockState
    {
        return {
            isLoading: false,
            pages: []
        }
    }

    public componentDidMount()
    {
        this.updatePages();
    }
    
    public componentDidUpdate(prevProps: PageListBlockProps)
    {
        if (this.props.data.contentLink.id != prevProps.data.contentLink.id) {
            this.updatePages();
        }
    }

    protected updatePages()
    {
        if (this.state.isLoading) return; //Do not start loading again if we're already loading
        this.setState({isLoading: true});
        this.invokeTyped<any, PageListBlockViewModel>("Index").then(i => {
            if (i.data.pages) {
                let me = this;
                new Promise((resolve, reject) => {
                    try {
                        i.data.pages.forEach(p => {
                            me.getContext().injectContent(p.page);
                        });
                        resolve(true);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
            this.setState({
                isLoading: false,
                pages: i.data.pages
            });
        });
    }

    public render() : ReactNode | ReactNodeArray | null
    {
        let classes : Array<string> = ["row","PageListBlock","w-100"];
        if (this.props.className) classes.push(this.props.className);
        if (this.props.data.margin?.value) classes.push(this.props.data.margin.value);
        if (this.props.data.padding?.value) classes.push(this.props.data.padding.value);

        let template : string = this.props.data.template?.value || "defaultComponents";
        let previewOption : string = this.props.data.previewOption?.value || "1/3";

        let pages : ReactNode | ReactNodeArray = null;
        switch (template) {
            case "Grid":
                pages = this.renderGridTemplate(this.state.pages.map(viewModel => viewModel.page), 'plb_i_', previewOption);
                break;
            case "Top":
                pages = this.renderTopTemplate(this.state.pages.map(viewModel => viewModel.page), 'plb_i_', previewOption);
                break;
            default:
                pages = this.renderDefaultTemplate(this.state.pages.map(viewModel => viewModel.page), 'plb_i_', previewOption);
                break;
        }

        let heading : ReactNode = null;
        if (this.props.data.heading?.value || this.getContext().isEditable()) {
            heading = <div className="d-flex justify-content-center p-3 w-100">
                <h2><Property iContent={this.props.data} field="heading" context={ this.getContext() } /></h2>
            </div>;
        }
        return <div className={ classes.join(" ") }>
            { heading }
            { pages }
        </div>
    }

    protected renderGridTemplate(pages: Array<IContent>, keyPrefix: string = 'plb_i_', previewOption: string = "1/3") : ReactNode
    {
        let items : ReactNodeArray = [];

        if (typeof(pages) != "object") {
            return items;
        }
        
        if (pages.length > 0) {
            items.push(pages.slice(0,1).map(iContent => this.renderGridTemplateTile(iContent as IContentWithTeaser, ['col-12', 'col-md-6'])));
        }
        if (pages.length > 1) {
            let lastIndex = Math.min(pages.length-1, 5);
            items.push(<div className="col-12 col-md-6 row no-gutters" key={ `pagelist-grid-group-${this.props.data.contentLink.id}` }>
                { pages.slice(1,lastIndex).map(iContent => this.renderGridTemplateTile(iContent as IContentWithTeaser, ['col-6'])) }
            </div>);
        }
        if (pages.length > 5) {
            let lastIndex = Math.min(pages.length-1, 9);
            items.push(pages.slice(5,lastIndex).map(iContent => this.renderGridTemplateTile(iContent as IContentWithTeaser, ['col-12', 'col-md-6'])));
        }
        if (pages.length > 9) {
            items.push(pages.slice(9).map(iContent => this.renderGridTemplateTile(iContent as IContentWithTeaser, ['col-12'])));
        }

        return <div className="row no-gutters page-list-grid w-100">{items}</div>
    }

    protected renderGridTemplateTile(teaser: IContentWithTeaser, cssClasses: Array<string> = []) : ReactNode {

        cssClasses = cssClasses || [];
        cssClasses.push('tile');

        return <Teaser content={teaser} className={ cssClasses.join(' ') } context={ this.getContext() } key={ "teaser-"+ContentLinkService.createApiId(teaser.contentLink) } />;
    }

    protected renderTopTemplate(pages: Array<IContent>, key: string, previewOption: string = "1/3")
    {
        let items: ReactNodeArray = [];
        if (pages && pages.length > 0) {
            items = pages.map(iContent => {
                let cssClasses: Array<string> = [];
                cssClasses.push(this.previewOptionToCssClass(previewOption));
                let teaser: IContentWithTeaser = iContent as IContentWithTeaser;
                return <div key={`${key}${teaser.contentLink.id}`} className={cssClasses.join(" ")}>
                    <div className="card mb-4">
                        <CmsComponent contentLink={teaser.pageImage?.value} expandedValue={teaser.pageImage?.expandedValue} context={this.getContext()} className="card-img-top w-100" />
                        <div className="card-body">
                            <h5 className="card-title">{teaser.name}</h5>
                            <p className="card-text">{teaser.teaserText.value}</p>
                            <Link href={teaser} className="btn btn-primary">Read more</Link>
                        </div>
                    </div>
                </div>
            });
        }
        
        return items;
    }

    protected renderDefaultTemplate(pages: Array<IContent>, key: string, previewOption: string = "1/3")
    {
        let items: ReactNodeArray = [];
        if (pages && pages.length > 0) {
            items = pages.map(iContent => <div key={`${key}${iContent.contentLink.id}`} className={this.previewOptionToCssClass(previewOption)}>
                <CmsComponent contentLink={iContent.contentLink} expandedValue={iContent} context={this.getContext()} contentType="Block" />
            </div>);
        }
       
        return <div className="row no-gutters">{items}</div>
    }

    protected previewOptionToCssClass(previewOption: string) 
    {
        switch (previewOption) {
            case "1/3":
                return "col-12 col-md-4";
            default: 
                return "col";
        }
    }
}
