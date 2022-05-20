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
import page from '../../commons/page'
import toasts from '../../commons/toasts'
import ConfirmationDialog from '../ConfirmationDialogue/ConfirmationDialog'

const { parseToastError } = toasts

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
      page.refreshPage()
    } catch (e: any) {
      parseToastError(e)
    }
  }

  return (
    <IconButton style={{ color: '#FFF' }} onClick={() => setShowConfirmation(true)} disabled={showConfirmation}>
      <Icon />
      <ConfirmationDialog
        confirmText="Restart"
        message="Are you sure you want to restart your node?"
        open={showConfirmation}
        onCancel={() => setShowConfirmation(false)}
        onConfirm={handleStop}
        content={<div>{isCountdown && <p>Page will be automatically refreshed in: {timer.toFixed(1)}</p>}</div>}
      />
    </IconButton>
  )
}
