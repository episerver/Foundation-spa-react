import React, { ReactNode } from 'react';
import { Taxonomy, ComponentTypes } from "@episerver/spa-core";

interface ComponentErrorData extends Taxonomy.IContent {
    error: any
}

export default class ComponentError extends ComponentTypes.AbstractComponent<ComponentErrorData> {
    public render() : ReactNode
    {
        return <div className="alert alert-danger text-center m-3" role="alert">An error did occur while rendering the component</div>
    }
}