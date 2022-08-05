/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactComponent as BellSvg } from '../../../../assets/images/bell.svg'
import { IconButton } from '../../../../Components/Inputs/IconButton'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { List } from './List'
import { devices } from '../../../../theme/themes'
import { tequila } from '../../../../api/tequila'
import { useAppSelector } from '../../../../commons/hooks'
import remoteStorage from '../../../../commons/remoteStorage'
import { Notification, KEY_CURRENT_NODE_VERSION_LAST_CHECK } from '../../../../commons/notifications'
import { useMemo } from 'react'
import { toast } from 'react-toastify'
import errors from '../../../../commons/errors'
import { fetchLatestNodeVersion } from '../../../../api/node-version.management'
const TWO_HOURS_MS = 2 * 60 * 60 * 1000
const { api } = tequila
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

  top: 48px;
  left: -260px;
`

export const Notifications = () => {
  const [open, setOpen] = useState(false)
  const [notificationList, setNotificationList] = useState<Notification[]>([
    {
      variant: 'negative',
      subject: 'Warning Notification heading',
      message: 'Small description for warning notification',
    },
    {
      variant: 'neutral',
      subject: 'Neutral Notification heading',
      message: 'Small description for neutral notification',
    },
    {
      variant: 'positive',
      subject: 'Positive Notification heading',
      message: 'Small description for positive notification',
    },
  ])

  const now = useMemo(() => {
    return Date.now()
  }, [])

  const lastCheck = useAppSelector(remoteStorage.selector<number>(KEY_CURRENT_NODE_VERSION_LAST_CHECK))
  useEffect(() => {
    ;(async () => {
      try {
        if (!lastCheck || now > lastCheck + TWO_HOURS_MS) {
          const healthCheck = await api.healthCheck()
          const latestRelease = await fetchLatestNodeVersion()
          if (healthCheck.version.toString() !== latestRelease) {
            const updateNotification: Notification = {
              variant: 'update',
              subject: 'New version released',
              message: 'Update app to experience new features',
            }
            setNotificationList((p) => [...p, updateNotification])
            remoteStorage.put(KEY_CURRENT_NODE_VERSION_LAST_CHECK, now)
          }
        }
      } catch (e: any) {
        toast.error(errors.apiError(e).human())
      }
    })()
  }, [])

  return (
    <Container>
      <Dot />
      <IconButton icon={<BellIcon />} onClick={() => setOpen((p) => !p)} />
      {open && (
        <ListContainer>
          <List list={notificationList} />
        </ListContainer>
      )}
    </Container>
  )
}
