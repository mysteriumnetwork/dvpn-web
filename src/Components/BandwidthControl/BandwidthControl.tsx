/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import { Switch } from '../Switch'
import ConfirmationDialogue from '../ConfirmationDialogue/ConfirmationDialogue'

import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

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

      <div>
        <Typography id="non-linear-slider" gutterBottom>
          Max bandwidth
        </Typography>

        <Slider
          value={typeof bandwidth === 'number' ? bandwidth : 0}
          onChange={(event: any, newValue: number | number[]) => {
            setBandwidth(newValue)
            setShowConfirm(true)
          }}
          aria-labelledby="input-slider"
          step={5}
          min={5}
          max={100}
          disabled={!turnedOn}
          valueLabelDisplay="auto"
        />
      </div>
      <p className="text">Limit bandwidth to {bandwidth}Mb/s</p>

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
