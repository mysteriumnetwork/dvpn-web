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
import { ClockIcon, DataIcon, InfoIcon, PeopleIcon, WalletIcon } from '../../../../Components/Icons/Icons'
import { CircularSpinner } from '../../../../Components/CircularSpinner/CircularSpinner'
import { useState } from 'react'
import { useAppSelector } from '../../../../commons/hooks'
import { selectors } from '../../../../redux/selectors'
import calls from '../../../../commons/calls'
import { tequila } from '../../../../api/tequila'
import { themeCommon } from '../../../../theme/themeCommon'

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${themeCommon.colorDarkBlue};
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
  height: 100%;
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
  width: 100%;
  justify-content: space-between;
`
const Content = styled.div`
  background: ${({ theme }) => theme.bgServiceCardContent};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 31px;

  display: flex;
  flex-direction: column;
  gap: 24px;
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
}

export const ServiceCard = ({
  name,
  description,
  serviceType,
  approvalPending = false,
  priceGiB = 0,
  priceHour = 0,
  earnings = 0,
  totalEarning = 0,
}: Props) => {
  const { id } = useAppSelector(selectors.currentIdentitySelector)
  const serviceInfo = useAppSelector(selectors.serviceInfoSelector).find((si) => si.type === serviceType)
  const [loading, setLoading] = useState<boolean>(false)

  const enabled = !!serviceInfo

  const handleSwitch = async () => {
    setLoading(true)
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
    setLoading(false)
  }

  return (
    <Card>
      {loading && (
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
            value={myst.display(priceGiB, { fractionDigits: 4 })}
            icon={<DataIcon $inactive={!enabled} />}
          />
          <InfoCard
            title="Price per hour"
            value={myst.display(priceHour, { fractionDigits: 4 })}
            icon={<ClockIcon $inactive={!enabled} />}
          />
        </Row>
        <Row>
          <InfoCard
            title="Service earnings"
            value={myst.display(earnings, { fractionDigits: 4 })}
            icon={<WalletIcon $inactive={!enabled} />}
          />
          <InfoCard
            title="Total earnings"
            value={myst.display(totalEarning, { fractionDigits: 4 })}
            icon={<PeopleIcon $inactive={!enabled} />}
          />
        </Row>
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
