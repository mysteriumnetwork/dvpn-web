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
import { SUPPORTED_GATEWAYS } from '../../gateways'
import CopyToClipboard from '../../../../../../Components/CopyToClipboard/CopyToClipboard'
import { DOCS_METAMASK } from '../../../../../../constants/urls'

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
  align-items: center;
  gap: 2px;
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
  display: flex;
  align-items: center;
  gap: 5px;
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
const Title = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.common.fontSizeHumongous};
  font-weight: 600;
`

const Controls = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const Direct = ({ back, next, payments: { amountRequiredWei } }: GatewayProps) => {
  const { channelAddress, balanceTokens } = useAppSelector(selectors.currentIdentitySelector)
  const isRegistrationFeeReceived = myst.toWeiBig(balanceTokens.wei).gte(amountRequiredWei)

  return (
    <Content>
      <Title>{SUPPORTED_GATEWAYS.direct.title}</Title>
      <Description>
        Send no less than {myst.display(amountRequiredWei, { fractionDigits: 2 })} to the address below. Important: only
        Polygon blockchain {currentCurrency()} is supported!{' '}
        <a href={DOCS_METAMASK} target="_blank" rel="noreferrer">
          Don't have any MYST? Read here how to get it.
        </a>
      </Description>
      <Centered>
        <QR>
          <QRCode value={channelAddress} />
        </QR>
        <ChannelAddress>
          {channelAddress}
          <CopyToClipboard text={channelAddress} />
        </ChannelAddress>
      </Centered>
      {!isRegistrationFeeReceived && (
        <Waiting>
          <Spinner />
          Wait for confirmation (might take couple of minutes)
        </Waiting>
      )}
      <Controls>
        {next && isRegistrationFeeReceived && <Button label="Continue" onClick={next} />}
        {back && !isRegistrationFeeReceived && (
          <Button onClick={back} variant="outlined" rounded label="Back To Payment Method" />
        )}
      </Controls>
    </Content>
  )
}

export default Direct
