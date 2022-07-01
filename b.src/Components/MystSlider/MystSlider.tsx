/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Mark, Slider as MUISlider } from '@material-ui/core'
import './MystSlider.scss'
import { currentCurrency } from '../../commons/currency'

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
  headerAmount?: (value: number, myst?: boolean) => string
  popover?: (value: number, myst?: boolean) => string
  onChangeCommitted?: () => void
}

const MystSlider = ({
  value,
  myst,
  label,
  handleChange,
  step,
  min,
  max,
  disabled,
  marks,
  popover = (value: number, myst?: boolean) => `${value} ${myst ? currentCurrency() : ''}`,
  headerAmount = (value: number, myst?: boolean): string => `${value} ${myst ? currentCurrency() : ''}`,
  onChangeCommitted,
}: Props): JSX.Element => {
  return (
    <div className="slider">
      <div className="slider__header">
        <div className="slider__header--label">{label}</div>
        <div className="slider__header--amount">{headerAmount(value, myst)}</div>
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
          valueLabelFormat={(v) => popover(v, myst)}
          marks={marks}
          onChangeCommitted={onChangeCommitted}
        />
      </div>
    </div>
  )
}

export default MystSlider
