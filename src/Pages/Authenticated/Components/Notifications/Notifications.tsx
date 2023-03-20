/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useRef, useState } from 'react'
import {
  arrow,
  autoUpdate,
  offset,
  useClick,
  useFloating,
  useFocus,
  useInteractions,
} from '@floating-ui/react-dom-interactions'
import { NodeReleaseCheck } from './NodeReleaseCheck'
import { UpdateCardMessage } from './Card'
import { BeneficiaryTxCheck } from './BeneficiaryTxCheck'
import { NotificationCardProps } from './types'
import { IconButton } from '../../../../Components/Inputs/IconButton'
import styled from 'styled-components'
import { ReactComponent as BellSvg } from '../../../../assets/images/bell.svg'
import { List } from './List'

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

const ListContainer = styled.div`
  width: 280px;
  z-index: 10;
`

const Arrow = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  z-index: 10;
  background-color: ${({ theme }) => theme.common.colorWhite};
  transform: rotate(45deg);
`
const Trigger = styled.div`
  position: relative;
  border: none;
  background: none;
`
export const Notifications = () => {
  const [open, setOpen] = useState(false)

  const arrowRef = useRef(null)
  const [notifications, setNotifications] = useState(new Map<string, NotificationCardProps>())
  const showDot = notifications.size > 0
  const addNotification = (id: string, notification: NotificationCardProps) => {
    setNotifications(new Map(notifications.set(id, notification)))
  }
  const { x, y, reference, placement, floating, strategy, context, middlewareData } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(10), arrow({ element: arrowRef })],
    placement: 'bottom-end',
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context, { toggle: true }),
    useFocus(context, { keyboardOnly: false }),
  ])
  const { x: arrowX, y: arrowY } = middlewareData.arrow ?? {}
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.split('-')[0]]
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
      <Trigger {...getReferenceProps({ ref: reference })}>
        <IconButton icon={<BellIcon />}>{showDot && <Dot />}</IconButton>
      </Trigger>
      {open && (
        <ListContainer
          onBlur={() => setOpen(false)}
          {...getFloatingProps({
            ref: floating,
            style: { position: strategy, top: y ?? 0, left: x ?? 0, width: 'max-content' },
          })}
        >
          <List list={Array.from(notifications.values())} />
          <Arrow
            ref={arrowRef}
            style={{
              top: arrowY != null ? `${arrowY}px` : '',
              left: arrowX != null ? `${arrowX}px` : '',
              right: '',
              [staticSide as string]: '-5px',
            }}
          />
        </ListContainer>
      )}
    </>
  )
}
