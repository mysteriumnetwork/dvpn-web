/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import * as React from 'react'
import themes from '../../commons/themes'
import RCSlider from 'rc-slider'
import 'rc-slider/assets/index.css'

const Content = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`

const StyledRCSlider = styled(RCSlider)`
  .rc-slider-rail {
    background: ${themes.common.colorGrayBlue}33;
  }

  .rc-slider-track {
    background: ${themes.common.colorKey};
  }

  .rc-slider-handle {
    //width: 8px;
    //height: 8px;
    //margin-top: -2.5px;
    border: solid 5px ${themes.common.colorKey};
  }

  .rc-slider-handle:active {
    border-color: ${themes.common.colorKeyLight};
    box-shadow: 0 0 5px ${themes.common.colorKeyLight};
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }

  .rc-slider-dot {
    position: absolute;
    bottom: -6px;
    width: 0;
    height: 0;
    vertical-align: middle;
    background-color: ${themes.common.colorGrayBlue};
    border: 1px dashed ${themes.common.colorGrayBlue} !important;
    border-radius: 10px;
    cursor: pointer;
  }

  .rc-slider-dot-active {
    border-color: ${themes.common.colorGrayBlue};
  }

  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: ${themes.common.colorKeyLight};
    box-shadow: 0 0 5px ${themes.common.colorKeyLight};
  }
  .rc-slider-mark-text {
    color: ${themes.common.colorGrayBlue2};
    font-size: ${themes.common.fontSizeSmall};
    font-weight: 400;
    width: 80px;
  }

  .rc-slider-mark-text-active {
    color: ${themes.common.colorGrayBlue2};
    font-size: ${themes.common.fontSizeSmall};
    font-weight: 400;
  }
`

interface Props {
  min?: number
  max?: number
  value?: number | number[]
  onChange?: (v: number | number[]) => void
  dots?: boolean
  disabled?: boolean
  step?: number
  marks?: Record<string | number, React.ReactNode>
}

export const Slider = ({ min, max, value, onChange, dots, disabled, marks, step = 1 }: Props) => {
  return (
    <Content>
      <StyledRCSlider
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        dots={dots}
        disabled={disabled}
        marks={marks}
        step={step}
      />
    </Content>
  )
}

// const handleRender: SliderProps['handleRender'] = (node, props) => {
//   return (
//     <HandleTooltip value={props.value} visible={true}>
//       {node}
//     </HandleTooltip>
//   )
// }
//
// const HandleTooltip = (props: {
//   value: number
//   children: React.ReactElement
//   visible: boolean
//   tipFormatter?: (value: number) => React.ReactNode
// }) => {
//   const { value, children, visible, tipFormatter = (val) => `${val} %`, ...restProps } = props
//
//   const tooltipRef = React.useRef<any>()
//   const rafRef = React.useRef<number | null>(null)
//
//   function cancelKeepAlign() {
//     raf.cancel(rafRef.current!)
//   }
//
//   function keepAlign() {
//     rafRef.current = raf(() => {
//       tooltipRef.current?.forcePopupAlign()
//     })
//   }
//
//   React.useEffect(() => {
//     if (visible) {
//       keepAlign()
//     } else {
//       cancelKeepAlign()
//     }
//
//     return cancelKeepAlign
//   }, [value, visible])
//
//   return (
//     <RCTooltip
//       placement="top"
//       overlay={tipFormatter(value)}
//       overlayInnerStyle={{ minHeight: 'auto' }}
//       ref={tooltipRef}
//       visible={visible}
//       {...restProps}
//     >
//       {children}
//     </RCTooltip>
//   )
// }
