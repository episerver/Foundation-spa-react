import React, {ReactNode, ReactNodeArray} from 'react';
import EpiComponent from 'Episerver/EpiComponent';
import IContent from 'Episerver/Models/IContent';
import PageListBlockData, { PageListBlockProps } from 'app/Models/Content/PageListBlockData';
import { CmsComponent } from 'Episerver/Components/CmsComponent';
import IContentWithTeaser from 'Models/IContentWithTeaser';
import Link from 'Episerver/Components/Link';
import Property from 'Episerver/Components/Property';
import './PageListBlock/GridView.scss';

interface PageListBlockViewModel {
    heading: string
    pages: Array<IContent>
    showIntroduction: boolean
    showPublishDate: boolean
    padding: string
    currentBlock: PageListBlockData
}

interface PageListBlockState {
    isLoading: boolean
    pages: Array<IContent>
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
            this.setState({
                pages: i.data.pages
            });
        });
    }

    public render() : ReactNode | ReactNodeArray | null
    {
        let classes : Array<string> = ["row","PageListBlock"];
        if (this.props.className) classes.push(this.props.className);
        if (this.props.data.margin?.value) classes.push(this.props.data.margin.value);
        if (this.props.data.padding?.value) classes.push(this.props.data.padding.value);

        let template : string = this.props.data.template?.value || "defaultComponents";
        let previewOption : string = this.props.data.previewOption?.value || "1/3";

        console.log("PageListBlock props", this.props.data);
        let pages : ReactNode | ReactNodeArray = null;
        switch (template) {
            case "Grid":
                pages = this.renderGridTemplate(this.state.pages, 'plb_i_', previewOption);
                break;
            case "Top":
                pages = this.renderTopTemplate(this.state.pages, 'plb_i_', previewOption);
                break;
            default:
                pages = this.renderDefaultTemplate(this.state.pages, 'plb_i_', previewOption);
                break;
        }
        return <div className={ classes.join(" ") }>
            <h2>{ this.props.data.heading.value }</h2>
            { pages }
        </div>
    }

    protected renderGridTemplate(pages: Array<IContent>, keyPrefix: string = 'plb_i_', previewOption: string = "1/3") : ReactNode
    {
        let items : ReactNodeArray = [];
        
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

        return <div className="row no-gutters page-list-grid">{items}</div>
    }

    protected renderGridTemplateTile(teaser: IContentWithTeaser, cssClasses: Array<string> = []) : ReactNode {
        cssClasses = cssClasses || [];
        cssClasses.push('tile');
        return <div className={cssClasses.join(' ')} key={ `pagelist-grid-item-${teaser.contentLink.id}` }>
            <Property iContent={teaser} property="pageImage" context={this.getContext()} className="image w-100" />
            <div className="overlay p-3">
                <h5><Property iContent={teaser} property="name" context={this.getContext()} /></h5>
                <p><Property iContent={teaser} property="teaserText" context={this.getContext()} /></p>
                <Link href={ teaser } className="btn btn-primary">Read more</Link>
            </div>
        </div>
    }

    protected renderTopTemplate(pages: Array<IContent>, key: string, previewOption: string = "1/3")
    {
        let items: ReactNodeArray = [];
        if (pages && pages.length > 0) {
            items = pages.map(iContent => {
                let cssClasses: Array<string> = [];
                cssClasses.push(this.previewOptionToCssClass(previewOption));
                let teaser: IContentWithTeaser = iContent as IContentWithTeaser;
                return <div key={`${key}${iContent.contentLink.id}`} className={cssClasses.join(" ")}>
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