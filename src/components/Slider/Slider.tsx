/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react'
import RCSlider from 'rc-slider'

type Props = {
  readonly min?: number
  readonly max?: number
  readonly value?: number | number[]
  readonly onChange?: (v: number | number[]) => void
  readonly onChangeComplete?: (v: number | number[]) => void
  readonly dots?: boolean
  readonly disabled?: boolean
  readonly step?: number
  readonly marks?: Record<string | number, React.ReactNode>
}

export const Slider = ({ min, max, value, onChange, dots, disabled, marks, step = 1, onChangeComplete }: Props) => {
  return (
    <div className="relative flex w-full">
      <RCSlider
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        onChangeComplete={onChangeComplete}
        dots={dots}
        disabled={disabled}
        marks={marks}
        step={step}
      />
    </div>
  )
}
