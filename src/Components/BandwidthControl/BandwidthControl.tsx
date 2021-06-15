/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import { Switch } from '../Switch'
import ConfirmationDialogue from '../ConfirmationDialogue/ConfirmationDialogue'
import MystSlider from '../MystSlider/MystSlider'
import './BandwidthSettings.scss'

interface Props {
  message?: string
  turnedOn: boolean
  bandwidthExt: number
  disabled?: boolean
  onConfirm: (isShaping: boolean, value: number) => void
  onCancel?: () => void
  confirmButton?: (onConfirm?: () => void) => JSX.Element
}

const BandwidthControl = ({
  message = 'Are you sure?',
  disabled = false,
  onCancel = () => {},
  onConfirm,
  turnedOn,
  bandwidthExt,
}: Props) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(turnedOn)
  const [bandwidth, setBandwidth] = React.useState<number | string | Array<number | string>>(bandwidthExt)
  const maxLimitMbps = 200
  const minLimitMbps = 5

  useEffect(() => {
    setChecked(turnedOn)
    setBandwidth(bandwidthExt)
  }, [turnedOn])

  return (
    <>
      <Switch
        disabled={disabled}
        turnedOn={checked}
        handleChange={(e, checked) => {
          setChecked(checked)
          setShowConfirm(true)
        }}
      />

      <div className="bandwidth-settings-modal--block">
        <div className="settings">
          <div className="settings--slider">
            <MystSlider
              label="Limit bandwidth to "
              headerAmount={(v) => `${v} Mb/s`}
              popover={(v) => `${v} Mb/s`}
              myst={true}
              value={typeof bandwidth === 'number' ? bandwidth : 0}
              handleChange={(e, v) => {
                setBandwidth(v)
                setShowConfirm(true)
              }}
              step={5}
              min={minLimitMbps}
              max={maxLimitMbps}
              disabled={!turnedOn}
            />
            <div className="bottom-line">
              <p>{minLimitMbps}</p>
              <p>{maxLimitMbps} Mb/s</p>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationDialogue
        message={message}
        open={showConfirm}
        onCancel={() => {
          onCancel()
          setShowConfirm(false)
          setChecked(turnedOn)
          setBandwidth(bandwidthExt)
        }}
        onConfirm={async () => {
          if (typeof bandwidth === 'number') {
            await onConfirm(checked, bandwidth)
          }
          setShowConfirm(false)
        }}
      />
    </>
  )
}

export default BandwidthControl
