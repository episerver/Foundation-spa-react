import React, { useState, useEffect } from 'react'
import { Components, useContentDeliveryAPI, Services } from '@episerver/spa-core';
import { FilterActivitiesBlockProps } from '../../Models/Content/FilterActivitiesBlockData'

type ViewModel = {

}

export const FilterActivitiesBlock : React.FunctionComponent<FilterActivitiesBlockProps> = (props) => {
    const myId = Services.ContentLink.createLanguageId(props.data, '##', true);
    const cdApi = useContentDeliveryAPI();
    const [ viewModel, setViewModel ] = useState<ViewModel | undefined>(undefined);

    useEffect(() => {
        let isCancelled : boolean = false;

        cdApi.invoke<ViewModel>(props.data, "index").then(x => {if (!isCancelled) setViewModel(x.data)});

        return () => {
            isCancelled = true;
        }
    }, [ myId ]);

    return <div className="filter-block filter-activities-block">
        <div className="filter-title h6"><Components.Property iContent={ props.data } field="filterTitle" /></div>
    </div>
}

export default FilterActivitiesBlock;