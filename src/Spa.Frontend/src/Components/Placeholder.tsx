import React, { CSSProperties, FunctionComponent } from 'react'

export type PlaceholderProps = {
    style: Pick<CSSProperties, 'width' | 'height'>
}

export const Placeholder : FunctionComponent<PlaceholderProps> = (props) => {
    return <div style={ props.style } className="placeholder">{ props.children }</div>
}
export default Placeholder;