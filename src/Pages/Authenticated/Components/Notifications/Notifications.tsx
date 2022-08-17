/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactComponent as BellSvg } from '../../../../assets/images/bell.svg'
import { IconButton } from '../../../../Components/Inputs/IconButton'
import styled from 'styled-components'
import { useEffect, useMemo, useState } from 'react'
import { List } from './List'
import { devices } from '../../../../theme/themes'
import { useAppSelector } from '../../../../commons/hooks'
import remoteStorage from '../../../../commons/remoteStorage'
import { KEY_CURRENT_NODE_VERSION_LAST_CHECK, KEY_LATEST_NODE_VERSION } from './constants'
import { toast } from 'react-toastify'
import errors from '../../../../commons/errors'
import { fetchLatestNodeVersion } from '../../../../api/node-version.management'
import { selectors } from '../../../../redux/selectors'
import { NotificationCardProps } from './types'
import { UpdateCardMessage } from './Card'

const TWO_HOURS_MS = 2 * 60 * 60 * 1000

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
  width: 5px;
  height: 5px;
  border-radius: 100px;
  border: ${({ theme }) => theme.notifications.border};
  background: ${({ theme }) => theme.notifications.background};

  right: 10%;
  top: 0;
  z-index: 1;
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
  border-bottom: 8px solid ${({ theme }) => theme.notifications.list.background};
  border-left: 8px solid transparent;
`

const ID_BENEFICIARY_TX_ERROR = 'ID_BENEFICIARY_TX_ERROR'
const ID_NODE_UPDATE = 'ID_NODE_UPDATE'

export const Notifications = () => {
  const healthCheck = useAppSelector(selectors.healthCheck)
  const [open, setOpen] = useState(false)
  const beneficiaryTxStatus = useAppSelector(selectors.beneficiaryTxStatus)

  const [notifications, setNotifications] = useState(new Map<string, NotificationCardProps>())

  const addNotification = (id: string, notification: NotificationCardProps) => {
    setNotifications(new Map(notifications.set(id, notification)))
  }

  useEffect(() => {
    if (!beneficiaryTxStatus.error) {
      return
    }
    addNotification(ID_BENEFICIARY_TX_ERROR, {
      variant: 'negative',
      subject: 'External Wallet address change failed',
      message: beneficiaryTxStatus.error,
    })
  }, [beneficiaryTxStatus.error])

  const latestNodeVersion = useAppSelector(remoteStorage.selector(KEY_LATEST_NODE_VERSION))
  useEffect(() => {
    ;(async () => {
      if (healthCheck.version.toString() !== latestNodeVersion) {
        addNotification(ID_NODE_UPDATE, {
          variant: 'update',
          subject: 'New version released',
          message: <UpdateCardMessage />,
        })
      }
    })()
  }, [latestNodeVersion])

  const now = useMemo(() => {
    return Date.now()
  }, [])

  const lastChecked = useAppSelector(remoteStorage.selector<number>(KEY_CURRENT_NODE_VERSION_LAST_CHECK))

  useEffect(() => {
    ;(async () => {
      try {
        if (!lastChecked || now > lastChecked + TWO_HOURS_MS) {
          const latestNodeVersion = await fetchLatestNodeVersion()
          remoteStorage.put(KEY_CURRENT_NODE_VERSION_LAST_CHECK, now)
          remoteStorage.put(KEY_LATEST_NODE_VERSION, latestNodeVersion)
        }
      } catch (e: any) {
        toast.error(errors.apiError(e).human())
      }
    })()
  }, [])

  return (
    <Container>
      {notifications.size > 0 && <Dot />}
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
