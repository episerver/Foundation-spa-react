import React, { FunctionComponent, useEffect, useState } from 'react';
import { Components, useEpiserver, useContentDeliveryAPI } from '@episerver/spa-core';
import CalendarBlockData, { CalendarBlockProps } from 'app/Models/Content/CalendarBlockData';

interface CalendarBlockViewModel {
    currentBlock: CalendarBlockData
    viewMode: string
    blockId: number
}

export const CalendarBlock : FunctionComponent<CalendarBlockProps> = (props) => {
    const api = useContentDeliveryAPI();

    let [viewModel, setViewModel] = useState<CalendarBlockViewModel>(undefined);

    useEffect(() => {
        if(props.data.eventsRoot.value){
            api.invoke<CalendarBlockViewModel>(props.data.contentLink, "Index").then(f => {
                setViewModel(f.data as CalendarBlockViewModel || undefined);
            });
        }
    }, [props.data]);

    const cssClasses : string[] = ["CalendarBlock"];
    if (props.data.padding?.value) cssClasses.push(props.data.padding?.value);
    if (props.data.margin?.value) cssClasses.push(props.data.margin?.value);
    
    let styles = {
        backgroundColor: viewModel.currentBlock.backgroundColor.value,
        opacity: viewModel.currentBlock.blockOpacity.value
    }

    //Directly output the mainBody
    return  <div style={styles} className={cssClasses.join(' ')} data-block-id={props.data.contentLink.id} data-block-viewmode={viewModel.currentBlock.viewMode.value}>
        </div>
}
export default CalendarBlock;