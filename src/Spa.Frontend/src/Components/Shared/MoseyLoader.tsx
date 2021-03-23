import React, { ReactNode } from 'react';
import { Components } from '@episerver/spa-core';

export default class MoseyLoader extends Components.Spinner {
    render() : ReactNode
    {
        return <div className="mosey-loader alert alert-primary text-center m-3" role="alert">
            <img src="/globalassets/_epihealth/logo_frontlineservices.png" alt="" className="img-fluid m-3" style={ { maxWidth: "25rem"} } />
            <hr/>
            <p className="align-middle">
                <span className="spinner-border text-secondary" role="status"><span className="sr-only">Loading...</span></span>
                Loading Frontline Services, your patience please...
            </p>
        </div>
    }
}