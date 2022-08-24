/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react'
import { tequila } from '../../api/tequila'
import page from '../../commons/page'
import errors from '../../commons/errors'
import { IconButton } from '../Inputs/IconButton'
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog'
import { ReactComponent as RestartSVG } from '../../assets/images/restart.svg'
import styled from 'styled-components'

const { parseToastError } = errors

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.common.colorKey};
  line-height: 14px;
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
`

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
    <>
      <Row>
        <IconButton icon={<RestartSVG />} onClick={() => setShowConfirmation(true)} />
        Restart
      </Row>
      <ConfirmationDialog
        disableBackdrop={isCountdown}
        title="Restart"
        message={
          isCountdown
            ? `Page will be automatically refreshed in: ${timer.toFixed(1)}`
            : 'Are you sure you want to restart your node?'
        }
        loading={isCountdown}
        show={showConfirmation}
        onCancel={() => setShowConfirmation(false)}
        onConfirm={handleStop}
      />
    </>
  )
}
