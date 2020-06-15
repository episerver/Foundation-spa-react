import React, { ReactNode } from 'react';
import IContent from "@episerver/spa-core/Models/IContent";
import EpiComponent from '@episerver/spa-core/EpiComponent';

interface ComponentErrorData extends IContent {
    error: any
}

export default class ComponentError extends EpiComponent<ComponentErrorData> {
    public render() : ReactNode
    {
        return <div className="alert alert-danger text-center m-3" role="alert">An error did occur while rendering the component</div>
    }
}