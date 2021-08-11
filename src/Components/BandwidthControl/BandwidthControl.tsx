/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import MystSlider from '../MystSlider/MystSlider'
import './BandwidthSettings.scss'
import { useState } from 'react'

interface Props {
  bandwidth: number
  confirmButton?: (onConfirm?: () => void) => JSX.Element
  minLimitMbps?: number
  maxLimitMbps?: number
  onChange: (n: number) => void
}

const BandwidthControl = ({ bandwidth, minLimitMbps = 5, maxLimitMbps = 200, onChange }: Props) => {
  const [value, setValue] = useState<number>(bandwidth)

  return (
    <div className="bandwidth-settings-modal--block">
      <div className="settings">
        <div className="settings--slider">
          <MystSlider
            label="Limit bandwidth to "
            headerAmount={(v) => `${v} Mb/s`}
            popover={(v) => `${v} Mb/s`}
            myst={true}
            value={value}
            handleChange={(e, v) => {
              setValue(v)
              onChange(v)
            }}
            step={5}
            min={minLimitMbps}
            max={maxLimitMbps}
          />
          <div className="bottom-line">
            <p>{minLimitMbps}</p>
            <p>{maxLimitMbps} Mb/s</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BandwidthControl
