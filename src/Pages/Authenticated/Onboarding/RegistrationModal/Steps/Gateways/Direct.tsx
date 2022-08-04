/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { QRCode } from 'react-qr-svg'
import { currentCurrency } from '../../../../../../commons/currency'
import { myst } from '../../../../../../commons/mysts'
import { selectors } from '../../../../../../redux/selectors'
import { GatewayProps } from './types'
import { useAppSelector } from '../../../../../../commons/hooks'
import styled from 'styled-components'
import { Button } from '../../../../../../Components/Inputs/Button'
import { CircularSpinner } from '../../../../../../Components/CircularSpinner/CircularSpinner'

const QR = styled.div`
  width: 150px;
  height: 150px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`
const Description = styled.div`
  display: flex;
  margin-top: 30px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  line-height: 22px;
  color: ${({ theme }) => theme.common.colorGrayBlue2};
`

const Centered = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`

const ChannelAddress = styled.div`
  margin-top: 10px;
  font-weight: 500;
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  color: ${({ theme }) => theme.common.colorKey};
`

const Spinner = styled(CircularSpinner)`
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

const Direct = ({ back, next, backText, payments: { amountRequiredWei } }: GatewayProps) => {
  const { channelAddress, balanceTokens } = useAppSelector(selectors.currentIdentitySelector)
  const isRegistrationFeeReceived = myst.toWeiBig(balanceTokens.wei).gte(amountRequiredWei)

  return (
    <Content>
      <Description>
        Send no less than {myst.display(amountRequiredWei, { fractionDigits: 2 })} to the address below. Important: only
        Polygon blockchain {currentCurrency()} is supported! Dont’t have any MYST? Read here now to get it.
      </Description>
      <Centered>
        <QR>
          <QRCode value={channelAddress} />
        </QR>
        <ChannelAddress>{channelAddress}</ChannelAddress>
      </Centered>
      {!isRegistrationFeeReceived && (
        <Waiting>
          <Spinner />
          Wait for confirmation (might take couple of minutes)
        </Waiting>
      )}
      {next && isRegistrationFeeReceived && <Button label="Continue" onClick={next} />}
      {back && !isRegistrationFeeReceived && (
        <Button onClick={back} variant="outlined" rounded label={backText || 'Back'} />
      )}
    </Content>
  )
}

export default Direct
