import React from 'react';
import { Slider, Switch } from '@material-ui/core';

interface PropsInterface {
    tunedOn: boolean;
    handleChange: Function;
    type: string;
}

export const DefaultSwitch: React.FC<PropsInterface> = (_props: PropsInterface) => {
    const props: PropsInterface = { ..._props };
    return (
        <Switch checked={props.tunedOn} onChange={props.handleChange()} className={'default-switch ' + props.type} />
    );
};
