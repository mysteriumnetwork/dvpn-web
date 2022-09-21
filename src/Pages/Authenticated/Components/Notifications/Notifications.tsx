/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactComponent as BellSvg } from '../../../../assets/images/bell.svg'
import { IconButton } from '../../../../Components/Inputs/IconButton'
import styled from 'styled-components'
import { useState } from 'react'
import { List } from './List'
import { devices } from '../../../../theme/themes'
import { NotificationCardProps } from './types'
import { UpdateCardMessage } from './Card'
import { NodeReleaseCheck } from './NodeReleaseCheck'
import { BeneficiaryTxCheck } from './BeneficiaryTxCheck'

const BellIcon = styled(BellSvg)`
  width: 80%;
  height: 80%;

  :active {
    width: 70%;
    height: 70%;
  }
`

const Container = styled.div`
  position: relative;
  @media ${devices.tablet} {
    margin-bottom: 20px;
  }
`

const Dot = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.notifications.bg};

  right: 10%;
  top: 0;
  z-index: 1;
  font-weight: 800;
  font-size: 9px;
  color: ${({ theme }) => theme.common.colorWhite};
`

const ListContainer = styled.div`
  position: absolute;
  width: 280px;
  z-index: 10;

  top: 56px;
  left: -210px;
`

const Arrow = styled.div`
  position: absolute;
  width: 4px;
  z-index: 10;

  top: -16px;
  left: 226px;
  border-top: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid ${({ theme }) => theme.notifications.list.bg};
  border-left: 8px solid transparent;
`

const ID_BENEFICIARY_TX_ERROR = 'ID_BENEFICIARY_TX_ERROR'
const ID_NODE_UPDATE = 'ID_NODE_UPDATE'

export const Notifications = () => {
  const [open, setOpen] = useState(false)

  const [notifications, setNotifications] = useState(new Map<string, NotificationCardProps>())

  const addNotification = (id: string, notification: NotificationCardProps) => {
    setNotifications(new Map(notifications.set(id, notification)))
  }

  return (
    <Container>
      <NodeReleaseCheck
        onNewNodeVersionAvailable={(current, latest) =>
          addNotification(ID_NODE_UPDATE, {
            variant: 'update',
            subject: `New version released (${latest})`,
            message: <UpdateCardMessage currentVersion={current} />,
          })
        }
      />
      <BeneficiaryTxCheck
        onTxError={(beneficiaryTxStatus) =>
          addNotification(ID_BENEFICIARY_TX_ERROR, {
            variant: 'negative',
            subject: 'External Wallet address change failed',
            message: beneficiaryTxStatus.error,
          })
        }
      />
      {notifications.size > 0 && <Dot>{notifications.size}</Dot>}
      <IconButton icon={<BellIcon />} onClick={() => setOpen((p) => !p)} />
      {open && (
        <>
          <ListContainer>
            <Arrow />
            <List list={Array.from(notifications.values())} />
          </ListContainer>
        </>
      )}
    </Container>
  )
}
