/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState } from 'react'
import { NodeReleaseCheck } from './NodeReleaseCheck'
import { UpdateCardMessage } from './Card'
import { BeneficiaryTxCheck } from './BeneficiaryTxCheck'
import { NotificationCardProps } from './types'
import { IconButton } from '../../../../Components/Inputs/IconButton'
import styled from 'styled-components'
import { ReactComponent as BellSvg } from '../../../../assets/images/bell.svg'
import { List } from './List'
import { Floating } from '../../../../Components/Floating/Floating'

const ID_BENEFICIARY_TX_ERROR = 'ID_BENEFICIARY_TX_ERROR'
const ID_NODE_UPDATE = 'ID_NODE_UPDATE'

const BellIcon = styled(BellSvg)`
  width: 80%;
  height: 80%;

  :active {
    width: 70%;
    height: 70%;
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

const ListContainer = styled(Floating.Base)`
  width: 280px;
  background-color: ${({ theme }) => theme.common.colorWhite};
  border-radius: 20px;
  z-index: 10;
`

const Trigger = styled(Floating.Anchor)`
  position: relative;
  border: none;
  background: none;
`
export const Notifications = () => {
  const state = Floating.useFloatingState({ id: 'notifications', delay: 0, placement: 'bottom-end', clickable: true })
  const [notifications, setNotifications] = useState(new Map<string, NotificationCardProps>())
  const showDot = notifications.size > 0
  const addNotification = (id: string, notification: NotificationCardProps) => {
    setNotifications(new Map(notifications.set(id, notification)))
  }

  return (
    <>
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
      <>
        <Trigger state={state}>
          <IconButton icon={<BellIcon />}>{showDot && <Dot />}</IconButton>
        </Trigger>
        <ListContainer state={state}>
          <List list={Array.from(notifications.values())} />
        </ListContainer>
      </>
    </>
  )
}
