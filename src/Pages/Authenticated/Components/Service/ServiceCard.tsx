/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Switch } from '../../../../Components/Switch/Switch'
import { myst } from '../../../../commons/mysts'
import styled from 'styled-components'
import { InfoCard } from './InfoCard'
import { ClockIcon, DataIcon, InfoIcon } from '../../../../Components/Icons/Icons'
import { CircularSpinner } from '../../../../Components/CircularSpinner/CircularSpinner'
import { useState } from 'react'
import { useAppSelector } from '../../../../commons/hooks'
import { selectors } from '../../../../redux/selectors'
import calls from '../../../../commons/calls'
import { tequila } from '../../../../api/tequila'
import { themeCommon } from '../../../../theme/themeCommon'
import { devices } from '../../../../theme/themes'
import { Prices } from './types'

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${themeCommon.colorDarkBlue};
  @media ${devices.tablet} {
    flex-direction: column;
    min-width: 325px;
  }
`

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: ${themeCommon.colorDarkBlue}6A;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Spinner = styled(CircularSpinner)`
  width: 50px;
  height: 50px;
  border: 6px solid ${themeCommon.colorWhite};
  z-index: 1001;
`

const Header = styled.div`
  position: relative;
  background: ${({ theme }) => theme.bgServiceCardHeader};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 24px;
  font-size: ${themeCommon.fontSizeBig};
  font-weight: 700;
  height: 100%;
  @media ${devices.tablet} {
    padding-top: 12px;
    box-shadow: ${({ theme }) => theme.bgServiceCardHeaderBoxShadow};
  }
`

const Controls = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.text.colorMain};
`

const Description = styled.div`
  color: ${({ theme }) => theme.text.colorSecondary};
  font-size: ${themeCommon.fontSizeSmall};
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${devices.tablet} {
    align-items: center;
  }
`
const Content = styled.div`
  background: ${({ theme }) => theme.bgServiceCardContent};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 31px;
  display: flex;
  flex-direction: column;

  @media ${devices.tablet} {
    padding: 20px;
    gap: 12px;
    box-shadow: ${({ theme }) => theme.bgServiceCardContentBoxShadow};
    background-color: ${({ theme }) => theme.bgServiceCardContentMobile};
  }
`

interface Props {
  name: string
  description: string
  serviceType: string
  approvalPending?: boolean
  priceGiB?: string | number
  priceHour?: string | number
  earnings?: string | number
  totalEarning?: string | number
  prices?: Prices
  loading?: boolean
  onChange?: () => {}
  enabled?: boolean
}

const CLICK_COOLDOWN_MS = 1_000

export const ServiceCard = ({
  name,
  description,
  serviceType,
  approvalPending = false,
  earnings = 0,
  totalEarning = 0,
  prices = { pricePerGibWei: '0', pricePerHourWei: '0' },
  loading,
}: Props) => {
  const { id } = useAppSelector(selectors.currentIdentity)
  const serviceInfo = useAppSelector(selectors.runningServices).find((si) => si.type === serviceType)
  const [internalLoading, setInternalLoading] = useState<boolean>(false)

  const enabled = !!serviceInfo

  const handleSwitch = async () => {
    setInternalLoading(true)
    const sid = serviceInfo?.id
    if (sid) {
      await calls.tryTo(() => tequila.api.serviceStop(sid))
    } else {
      await calls.tryTo(() =>
        tequila.api.serviceStart({
          providerId: id,
          type: serviceType,
        }),
      )
    }
    setTimeout(() => setInternalLoading(false), CLICK_COOLDOWN_MS)
  }

  return (
    <Card>
      {(internalLoading || loading) && (
        <Overlay>
          <Spinner />
        </Overlay>
      )}
      <Header>
        {approvalPending && <PendingApproval />}
        <Controls>
          {name}
          <Switch checked={enabled} onChange={handleSwitch} />
        </Controls>
        <Description>{description}</Description>
      </Header>
      <Content>
        <Row>
          <InfoCard
            title="Price per GiB"
            value={myst.display(prices.pricePerGibWei, { fractions: 4 })}
            icon={<DataIcon $inactive={!enabled} />}
          />
          <InfoCard
            title="Price per hour"
            value={myst.display(prices.pricePerHourWei, { fractions: 4 })}
            icon={<ClockIcon $inactive={!enabled} />}
          />
        </Row>
        {/*<Row>*/}
        {/*  <InfoCard*/}
        {/*    title="Service earnings"*/}
        {/*    value={myst.display(earnings, { fractions: 4 })}*/}
        {/*    icon={<WalletIcon $inactive={!enabled} />}*/}
        {/*  />*/}
        {/*  <InfoCard*/}
        {/*    title="Total earnings"*/}
        {/*    value={myst.display(totalEarning, { fractions: 4 })}*/}
        {/*    icon={<PeopleIcon $inactive={!enabled} />}*/}
        {/*  />*/}
        {/*</Row>*/}
      </Content>
    </Card>
  )
}

const ApprovalBadge = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  background: ${themeCommon.colorGrayBlue};
  border-radius: 12px;
  font-size: ${themeCommon.fontSizeSmall};
  top: -8px;
  padding: 4px;
  color: ${themeCommon.colorWhite};
  width: 150px;
`

const PendingApproval = () => (
  <ApprovalBadge>
    Pending Approval
    <InfoIcon $inverted />
  </ApprovalBadge>
)
