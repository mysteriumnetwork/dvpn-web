/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { Mark, Slider as MUISlider } from '@material-ui/core'
import './Slider.scss'

interface Props {
  label: string
  value: number
  handleChange: (event: React.ChangeEvent<any>, value: number) => void
  step: number
  min: number
  max: number
  disabled?: boolean
  myst?: boolean
  mystSlider?: boolean
  marks?: Mark[]
}

const Slider = ({ value, myst, label, handleChange, step, min, max, disabled, marks }: Props): JSX.Element => {
  const labelFormat = (value: number) => `${value} ${myst ? 'MYST' : ''}`

  return (
    <div className="slider">
      <div className="slider__header">
        <div className="slider__header--label">{label}</div>
        <div className="slider__header--amount">
          {value} {myst ? 'MYST' : ''}
        </div>
      </div>
      <div className="slider__container">
        <MUISlider
          valueLabelDisplay="auto"
          step={step}
          min={min}
          max={max}
          onChange={(e, v) => {
            if (typeof v === 'number') {
              handleChange(e, v)
            }
          }}
          value={value}
          disabled={disabled}
          valueLabelFormat={labelFormat}
          marks={marks}
        />
      </div>
    </div>
  )
}

export default Slider
