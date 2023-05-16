import type { FunctionComponent, MouseEvent } from 'react'
import React, { useState, useId, useMemo } from 'react'

// Material UI Components
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

export type DropdownButtonProps<T = any> = {
    label: string
    options: { value: T, label: string }[]
    value: T
    onChange?: (event: MouseEvent<HTMLElement>, value: T ) => void
}

export const DropdownButton : FunctionComponent<DropdownButtonProps> = ({label, value, options, onChange }) => 
{
    const dropdownId = useId()
    const valueIdx = useMemo(() => options.findIndex(x => x.value == value), [ options, value ])
    const valueLabel = valueIdx >= 0 ? options[valueIdx].label : ""
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return <>
        <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            { label }: { valueLabel }
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            { options.map((option, idx) => {
                const optionId = `${dropdownId}-${idx}`
                return <MenuItem selected={ idx == valueIdx } key={optionId} onClick={ e => { handleClose(); onChange && onChange(e, option.value); } }>{ option.label }</MenuItem>
            })}
        </Menu>
    </>
}

export default DropdownButton