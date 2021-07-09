import React from 'react';
import './SiteSearchBox.scss';

export type SiteSearchBoxProps = {
    className?: string
}

export const SiteSearchBox : React.FunctionComponent<SiteSearchBoxProps> = (props) => 
{
    return <form className={ `site-search-box d-flex${ props.className ? " " + props.className : ""}` }>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
}
SiteSearchBox.displayName = "Site Search Box";

export default SiteSearchBox;