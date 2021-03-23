import React from 'react';
import { Alert } from 'reactstrap';
import { useEpiserver } from '@episerver/spa-core';

export type NetworkErrorProps = {};

export const NetworkError : React.FunctionComponent<NetworkErrorProps> = (props) =>
{
    const ctx = useEpiserver();

    if (!ctx.isDebugActive) return null;
    return <Alert color="danger" className="m-3"><strong>Debug: </strong>Unable to fetch iContent due to a network error</Alert>
}

export default NetworkError;