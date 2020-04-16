import React, { ReactNode } from 'react';
import Spinner from 'Episerver/Components/Spinner';

export default class MoseyLoader extends Spinner {
    render() : ReactNode
    {
        return <div className="mosey-loader alert alert-primary text-center m-3" role="alert">
            <img src="/globalassets/mosey-capital/moseycapitallogo.png" alt="" className="img-fluid" />
            <hr/>
            <p className="align-middle">
                <span className="spinner-border text-secondary" role="status"><span className="sr-only">Loading...</span></span>
                Loading Mosey Capital, your patience please...
            </p>
        </div>
    }
}