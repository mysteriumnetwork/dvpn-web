/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import * as React from 'react'
import RCSlider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { themeCommon } from '../../theme/themeCommon'

const Content = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`

const StyledRCSlider = styled(RCSlider)`
  .rc-slider-rail {
    background: ${themeCommon.colorGrayBlue}33;
  }

  .rc-slider-track {
    background: ${themeCommon.colorKey};
  }

  .rc-slider-handle {
    border: solid 5px ${themeCommon.colorKey};
  }

  .rc-slider-handle:active {
    border-color: ${themeCommon.colorKeyLight};
    box-shadow: 0 0 5px ${themeCommon.colorKeyLight};
    cursor: grabbing;
  }

  .rc-slider-dot {
    position: absolute;
    bottom: -6px;
    width: 0;
    height: 0;
    vertical-align: middle;
    background-color: ${themeCommon.colorGrayBlue};
    border: 1px dashed ${themeCommon.colorGrayBlue} !important;
    border-radius: 10px;
    cursor: pointer;
  }

  .rc-slider-dot-active {
    border-color: ${themeCommon.colorGrayBlue};
  }

  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: ${themeCommon.colorKeyLight};
    box-shadow: 0 0 5px ${themeCommon.colorKeyLight};
  }
  .rc-slider-mark-text {
    color: ${themeCommon.colorGrayBlue2};
    font-size: ${themeCommon.fontSizeSmall};
    font-weight: 400;
    margin: 0 10px;
    width: 80px;
  }
  .rc-slider-mark-text:last-of-type {
    padding-right: 30px;
  }

  .rc-slider-mark-text-active {
    color: ${themeCommon.colorGrayBlue2};
    font-size: ${themeCommon.fontSizeSmall};
    font-weight: 400;
  }
`

interface Props {
  min?: number
  max?: number
  value?: number | number[]
  onChange?: (v: number | number[]) => void
  onAfterChange?: (v: number | number[]) => void
  dots?: boolean
  disabled?: boolean
  step?: number
  marks?: Record<string | number, React.ReactNode>
}

export const Slider = ({ min, max, value, onChange, dots, disabled, marks, step = 1, onAfterChange }: Props) => {
  return (
    <Content>
      <StyledRCSlider
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        onAfterChange={onAfterChange}
        dots={dots}
        disabled={disabled}
        marks={marks}
        step={step}
      />
    </Content>
  )
}
