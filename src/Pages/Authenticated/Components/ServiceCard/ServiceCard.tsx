/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Switch } from '../../../../Components/Switch/Switch'
import { myst } from '../../../../commons/mysts'
import styled from 'styled-components'
import themes from '../../../../commons/themes'
import { InfoCard } from './InfoCard'
import { ClockIcon, DataIcon, InfoIcon, PeopleIcon, WalletIcon } from '../../../../Components/Icons/Icons'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${themes.current().colorDarkBlue};
`

const Header = styled.div`
  position: relative;
  background: ${themes.current().backgroundContent};
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
`

const Description = styled.div`
  color: ${themes.current().colorGrayBlue2};
  font-size: ${themes.current().fontSizeSmall};
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
const Content = styled.div`
  background: ${themes.current().backgroundLightgray};
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
  enabled: boolean
  approvalPending?: boolean
  onChange: () => void
  priceGiB?: string | number
  priceHour?: string | number
  earnings?: string | number
  totalEarning?: string | number
}

export const ServiceCard = ({
  name,
  description,
  enabled,
  onChange,
  approvalPending = false,
  priceGiB = 0,
  priceHour = 0,
  earnings = 0,
  totalEarning = 0,
}: Props) => {
  return (
    <Card>
      <Header>
        {approvalPending && <PendingApproval />}
        <Controls>
          {name}
          <Switch checked={enabled} onChange={onChange} />
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
  background: ${themes.current().colorGrayBlue};
  border-radius: 12px;
  font-size: ${themes.current().fontSizeSmall};
  top: -8px;
  padding: 4px;
  color: ${themes.current().colorWhite};
  width: 150px;
`

const PendingApproval = () => (
  <ApprovalBadge>
    Pending Approval
    <InfoIcon $inverted />
  </ApprovalBadge>
)
