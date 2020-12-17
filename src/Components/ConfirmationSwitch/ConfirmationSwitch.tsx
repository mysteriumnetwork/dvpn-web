/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import { Switch } from '../Switch'
import ConfirmationDialogue from '../ConfirmationDialogue/ConfirmationDialogue'

interface Props {
  message?: string
  turnedOn: boolean
  disabled?: boolean
  onConfirm: () => void
  onCancel?: () => void
  confirmButton?: (onConfirm?: () => void) => JSX.Element
}

const ConfirmationSwitch = ({
  message = 'Are you sure?',
  disabled = false,
  onCancel = () => {},
  onConfirm,
  turnedOn,
}: Props) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(turnedOn)

  useEffect(() => {
    setChecked(turnedOn)
  }, [turnedOn])

  return (
    <>
      <Switch
        disabled={disabled}
        turnedOn={checked}
        handleChange={(e, checked) => {
          setShowConfirm(true)
        }}
      />
      <ConfirmationDialogue
        message={message}
        open={showConfirm}
        onCancel={() => {
          onCancel()
          setShowConfirm(false)
        }}
        onConfirm={async () => {
          await onConfirm()
          setShowConfirm(false)
        }}
      />
    </>
  )
}

export default ConfirmationSwitch
