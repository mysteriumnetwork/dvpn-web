/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/icons/PowerSettingsNewOutlined'
import { useEffect, useState } from 'react'
import { tequila } from '../../api/wrapped-calls'
import { parseToastError } from '../../commons/toast.utils'
import ConfirmationDialogue from '../ConfirmationDialogue/ConfirmationDialogue'

export const PowerOffButton = () => {
  const { api } = tequila
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [isCountdown, setIsCountdown] = useState<boolean>(false)
  const [timer, setTimer] = useState<number>(10.0)

  useEffect(() => {
    if (isCountdown) {
      const interval = setInterval(() => setTimer((p) => p - 0.1), 100)
      return () => {
        clearInterval(interval)
        setTimer(10.0)
      }
    }
  }, [isCountdown])

  const handleStop = async () => {
    try {
      await api.stop()
      setIsCountdown(true)
      await new Promise((r) => setInterval(r, 10_000))
      setShowConfirmation(false)
      setIsCountdown(false)
      // @ts-ignore
      window.location.reload(true)
    } catch (e: any) {
      parseToastError(e)
    }
  }

  return (
    <IconButton style={{ color: '#FFF' }} onClick={() => setShowConfirmation(true)} disabled={showConfirmation}>
      <Icon />
      <ConfirmationDialogue
        message="Are you sure you would like to restart your node?"
        open={showConfirmation}
        onCancel={() => setShowConfirmation(false)}
        onConfirm={handleStop}
        content={<div>{isCountdown && <p>Page will be automatically refreshed in: {timer.toFixed(1)}</p>}</div>}
      />
    </IconButton>
  )
}