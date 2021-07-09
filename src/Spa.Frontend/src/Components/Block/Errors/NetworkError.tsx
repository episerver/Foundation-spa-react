import React from 'react';
import { useEpiserver } from '@episerver/spa-core';

export type NetworkErrorProps = {};

export const NetworkError : React.FunctionComponent<NetworkErrorProps> = (props) =>
{
    const ctx = useEpiserver();

    if (!ctx.isDebugActive) return null;
    return <div className="alert alert-danger m-3"><strong>Debug: </strong>Unable to fetch iContent due to a network error</div>
}

export default NetworkError;