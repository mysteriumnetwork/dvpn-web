import React from "react";
import {Slider} from '@material-ui/core';

interface PropsInterface {
  value: number;
  handleChange: Function;
  step: number;
  min: number;
  max: number;
  disabled?: boolean;
  mystSlider?: boolean;
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
      className={props.mystSlider ? "default-slider myst-slider" : "default-slider "}
      disabled={props.disabled}
      valueLabelFormat={props.mystSlider ? value => <div>{value} MYSTT</div> : value => value }
    />
  )
};