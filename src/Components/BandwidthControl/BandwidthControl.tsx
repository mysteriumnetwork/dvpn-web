/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import MystSlider from '../MystSlider/MystSlider'
import styles from './BandwidthSettings.module.scss'
import { useState } from 'react'

interface Props {
  bandwidthMbps: number
  confirmButton?: (onConfirm?: () => void) => JSX.Element
  minLimitMbps?: number
  maxLimitMbps?: number
  onChange: (n: number) => void
}

const BandwidthControl = ({ bandwidthMbps, minLimitMbps = 15, maxLimitMbps = 1000, onChange }: Props) => {
  const [value, setValue] = useState<number>(bandwidthMbps)

  return (
    <div className={styles.bandwidth}>
      <div className={styles.settings}>
        <div className={styles.slider}>
          <MystSlider
            label="Limit bandwidth to "
            headerAmount={(v) => `${v} Mbps`}
            popover={(v) => `${v} Mbps`}
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
          <div className={styles.line}>
            <p>{minLimitMbps}</p>
            <p>{maxLimitMbps} Mbps</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BandwidthControl
