import React from 'react';
import { Switch } from '@material-ui/core';

interface PropsInterface {
    tunedOn: boolean;
    handleChange: Function;
    type: string;
}

export const DefaultSwitch: React.FC<PropsInterface> = (props: PropsInterface) => {
    return (
        <Switch checked={props.tunedOn} onChange={props.handleChange()} className={'default-switch ' + props.type} />
    );
};
