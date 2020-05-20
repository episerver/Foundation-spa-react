import React, { Component, ReactNode } from 'react';
import EpiContext from '../Spa';

/**
 * Interface definition of the instance type of a Spinner
 * component.
 */
export interface SpinnerComponent {
	new (props: SpinnerProps) : Spinner
}

/**
 * The property definition for a spinner
 */
export interface SpinnerProps {

}

export default class Spinner extends Component<SpinnerProps>
{
	/**
	 * Create a new instance of a spinner component, used to mark
	 * the loading state of the application.
	 * 
	 * @param 	props 	The properties of the spinner
	 */
	static CreateInstance(props: SpinnerProps) : Spinner | null
	{
		if (!EpiContext.config().enableSpinner) {
			return null;
		}
		var spinnerType = EpiContext.config().spinner;
		if (!spinnerType) {
			return React.createElement(this, props) as unknown as Spinner;
		}
		return React.createElement(spinnerType, props) as unknown as Spinner;
	}

	render() : ReactNode {
		return <div className="alert alert-secondary" role="alert">
			<div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div>
			Loading...
		</div>;
	}
}