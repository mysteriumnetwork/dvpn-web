import React from "react";
import {TextField} from '@material-ui/core';

interface PropsInterface {
  password?: boolean
  handleChange: Function;
  value: string,
  stateName: string
}

export const DefaultTextField: React.FC<PropsInterface> = (_props: PropsInterface) => {
  const props: PropsInterface = {..._props};
  return (
    <TextField
      id="standard-basic"
      type={props.password ? 'password' : 'text'}
      onChange={props.handleChange(props.stateName) }
      value={props.value}
      className="default-text-field"
    />
  )
};