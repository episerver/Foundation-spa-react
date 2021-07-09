import React, { FunctionComponent } from 'react';
import { Taxonomy } from '@episerver/spa-core';
import { CalendarBlockProps } from 'app/Models/Content/CalendarBlockData';

export const CalendarBlock : FunctionComponent<CalendarBlockProps> = (props) => {
    const margin = Taxonomy.Property.readPropertyValue(props.data, "margin");
    const padding = Taxonomy.Property.readPropertyValue(props.data, "padding");
    const viewMode = Taxonomy.Property.readPropertyValue(props.data, "viewMode");
    const cssClasses : string[] = ["CalendarBlock"];
    if (padding) cssClasses.push(padding);
    if (margin) cssClasses.push(margin);
    
    const styles = {
        backgroundColor: Taxonomy.Property.readPropertyValue(props.data, "backgroundColor"),
        opacity: Taxonomy.Property.readPropertyValue(props.data, "blockOpacity")
    }

    //Directly output the mainBody
    return  <div style={styles} className={cssClasses.join(' ')} data-block-id={props.contentLink.id} data-block-viewmode={viewMode}></div>
}
export default CalendarBlock;