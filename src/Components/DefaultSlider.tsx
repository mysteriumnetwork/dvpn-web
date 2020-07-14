import React from "react";
import {Slider} from '@material-ui/core';

interface PropsInterface {
  value: number;
  handleChange: Function;
  step: number;
  min: number;
  max: number;
  disabled?: boolean;
}

export const DefaultSlider: React.FC<PropsInterface> = (_props: PropsInterface) => {
  const props: PropsInterface = {..._props};
  return (
    <Slider
      valueLabelDisplay="auto"
      step={props.step}
      min={props.min}
      max={props.max}
      onChange={props.handleChange()}
      value={props.value}
      className="default-slider"
      disabled={props.disabled}
    />
  )
};