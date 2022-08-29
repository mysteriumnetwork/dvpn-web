/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { CircularSpinner } from '../../../../../../../Components/CircularSpinner/CircularSpinner'
import React from 'react'

interface WaitingPaymentProps {
  isCompleted: boolean
  visible: boolean
}

const WaitingSpinner = styled(CircularSpinner)`
  width: 30px;
  height: 30px;
`

const Waiting = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  gap: 5px;
`

export const WaitingFiatPayment = ({ isCompleted, visible }: WaitingPaymentProps) => {
  if (visible) {
    return <></>
  }

  return isCompleted ? (
    <Waiting>Payment successful! Click Next to proceed.</Waiting>
  ) : (
    <Waiting>
      <WaitingSpinner />
      Please wait for confirmation (might take couple of minutes)
    </Waiting>
  )
}
