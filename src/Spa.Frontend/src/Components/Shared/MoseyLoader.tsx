import React, { useState, useEffect } from 'react';
import { ComponentTypes, useEpiserver } from '@episerver/spa-core';

export const MoseyLoader : ComponentTypes.Spinner<ComponentTypes.SpinnerProps> = (props) => {
    var ctx = useEpiserver();
	var timeout = props.timeout || ctx.config().spinnerTimeout || 0;
	var [isVisible, setIsVisible] = useState<boolean>(timeout === 0);
	if (ctx.config().enableSpinner) return null;

	useEffect(() => {
		if (timeout === 0) return;
		setIsVisible(false);
		const timeoutHandle = setTimeout(() => { setIsVisible(true) }, timeout);
		return () => {
			clearTimeout(timeoutHandle)
		}
	}, []);

	if (isVisible) {
        return <div className="mosey-loader alert alert-primary text-center m-3" role="alert">
            <img src="/globalassets/_epihealth/logo_frontlineservices.png" alt="" className="img-fluid m-3" style={ { maxWidth: "25rem"} } />
            <hr/>
            <p className="align-middle">
                <span className="spinner-border text-secondary" role="status"><span className="sr-only">Loading...</span></span>
                Loading Frontline Services, your patience please...
            </p>
        </div>
    }
    return null;
}

export default MoseyLoader;