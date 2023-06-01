/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { QRCode } from 'react-qr-svg'
import { currentCurrency } from '../../../../../../commons/currency'
import { myst } from '../../../../../../commons/mysts'
import { selectors } from '../../../../../../redux/selectors'
import { GatewayProps } from './types'
import { useAppSelector } from '../../../../../../commons/hooks'
import styled from 'styled-components'
import { Button } from '../../../../../../Components/Inputs/Button'
import { CircularSpinner } from '../../../../../../Components/CircularSpinner/CircularSpinner'
import { gatewayDescriptor } from '../../gateways'
import CopyToClipboard from '../../../../../../Components/CopyToClipboard/CopyToClipboard'
import { PAYOUT_GUIDE } from '../../../../../../constants/urls'
import { devices } from '../../../../../../theme/themes'
import React from 'react'
import localSettingsStorage from '../../../../../../commons/localSettingsStorage'
import { localStorageKeys } from '../../../../../../constants/local-storage.keys'
import { UIThemeLS } from '../../../../../../types/theme'
import { themeCommon } from '../../../../../../theme/themeCommon'

const QR = styled.div`
  width: 150px;
  height: 150px;
  @media ${devices.tablet} {
    width: 100px;
    height: 100px;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`
const Description = styled.div`
  gap: 2px;
  margin-top: 30px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  line-height: 22px;
  color: ${({ theme }) => theme.text.colorMain};
  @media ${devices.tablet} {
    margin-top: 5px;
  }
  > a {
    color: ${({ theme }) => theme.common.colorKey};
  }
`

const Centered = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  @media ${devices.tablet} {
    margin-top: 5px;
  }
`

const ChannelAddress = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  font-weight: 500;
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  color: ${({ theme }) => theme.common.colorKey};
  @media ${devices.tablet} {
    margin-top: 5px;
  }
`

const Spinner = styled(CircularSpinner)`
  width: 30px;
  height: 30px;
  @media ${devices.tablet} {
    height: 20px;
    width: 20px;
  }
`

const Waiting = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  gap: 5px;
  color: ${({ theme }) => theme.text.colorSecondary};
  @media ${devices.tablet} {
    height: 20px;
    margin-top: 10px;
    font-weight: 500;
    font-size: ${({ theme }) => theme.common.fontSizeSmall};
  }
`
const Title = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.common.fontSizeHumongous};
  font-weight: 600;
  color: ${({ theme }) => theme.text.colorSecondary};
  @media ${devices.tablet} {
    font-size: ${({ theme }) => theme.common.fontSizeHuge};
    justify-content: center;
  }
`

const Controls = styled.div`
  margin-top: 16px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 32px;
`
const { UI_THEME } = localStorageKeys
const Direct = ({ back, next, payments: { amountRequiredWei } }: GatewayProps) => {
  const { channelAddress, balanceTokens } = useAppSelector(selectors.currentIdentity)
  const isRegistrationFeeReceived = myst.toWeiBig(balanceTokens.wei).gte(amountRequiredWei)
  const theme = useAppSelector(localSettingsStorage.selector<UIThemeLS>(UI_THEME))?.key
  const isDark = theme === 'dark'
  return (
    <Content>
      <Title>{gatewayDescriptor('direct').title}</Title>
      <Description>
        Send no less than {myst.display(amountRequiredWei, { fractions: 2 })} to the address below. Important: only
        Polygon blockchain {currentCurrency()} is supported!{' '}
        <a href={PAYOUT_GUIDE} target="_blank" rel="noreferrer">
          Don't have any MYST? Read here how to get it.
        </a>
      </Description>
      <Centered>
        <QR>
          <QRCode
            fgColor={isDark ? themeCommon.colorLightBlue : undefined}
            bgColor={isDark ? themeCommon.colorDarkBlue : undefined}
            value={channelAddress}
          />
        </QR>
        <ChannelAddress>
          {channelAddress}
          <CopyToClipboard text={channelAddress} />
        </ChannelAddress>
      </Centered>
      {!isRegistrationFeeReceived && (
        <Waiting>
          <div>
            <Spinner />
          </div>
          Wait for confirmation (might take couple of minutes)
        </Waiting>
      )}
      <Controls>
        {next && isRegistrationFeeReceived && <Button label="Next" rounded onClick={next} />}
        {back && !isRegistrationFeeReceived && (
          <Button onClick={back} variant="outlined" rounded label="Back To Payment Method" />
        )}
      </Controls>
    </Content>
  )
}

export default Direct
