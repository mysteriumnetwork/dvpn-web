/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { observer } from 'mobx-react-lite'
import { Notification, NotificationProps } from './Notification'
import { NodeReleaseCheck } from './NodeReleaseCheck'
import { BeneficiaryTxCheck } from './BeneficiaryTxCheck'
import { BellIcon } from '../../../components/Icons/Icons'
import { Floating } from '../../../components/Floating/Floating'
import { DOCS_UPDATE_NODE } from '../../../constants/urls'
import ModalV2 from '../../../components/Modals/ModalV2'
import IconButton from '../../../components/Buttons/IconButton'
import { useMediaQuery } from 'react-responsive'
import { useStores } from '../../../mobx/store'

const ID_BENEFICIARY_TX_ERROR = 'ID_BENEFICIARY_TX_ERROR'
const ID_NODE_UPDATE = 'ID_NODE_UPDATE'

export const Notifications = observer(() => {
  const { menuStore } = useStores()
  const isMdScreen = useMediaQuery({ minWidth: 768 })
  const floatingNotificationState = Floating.useFloatingState({
    id: 'notifications',
    delay: 0,
    placement: 'bottom-end',
    clickable: true,
    useArrow: false,
  })

  const [showNotificationsModal, setShowNotificationsModal] = useState(floatingNotificationState.open)

  useEffect(() => {
    showNotificationsModal && menuStore.setIsOpen(false)
  }, [showNotificationsModal])

  const [notifications, setNotifications] = useState(new Map<string, NotificationProps>())
  const isNotification = useMemo(() => notifications.size > 0, [notifications])

  const addNotification = (id: string, notification: NotificationProps) => {
    setNotifications(new Map(notifications.set(id, notification)))
  }

  const notificationsList = useMemo(() => {
    return notifications.size > 0 ? (
      Array.from(notifications.values()).map((notification, index) => (
        <Notification key={`notification-${index}`} subject={notification.subject} message={notification.message} />
      ))
    ) : (
      <Notification subject="No notification yet" message="When you get notifications, they'll show up here" />
    )
  }, [notifications])

  return (
    <>
      <NodeReleaseCheck
        onNewNodeVersionAvailable={(current, latest) =>
          addNotification(ID_NODE_UPDATE, {
            subject: `New version released (${latest})`,
            message: (
              <>
                <div className="text-xs text-blue-850">Your current version: {current}</div>
                <div className="text-xs text-pink-525">
                  See how to{' '}
                  <a className="font-bold" href={DOCS_UPDATE_NODE} target="_blank" rel="noopener noreferrer">
                    Update
                  </a>{' '}
                  your node
                </div>
              </>
            ),
          })
        }
      />
      <BeneficiaryTxCheck
        onTxError={(beneficiaryTxStatus) =>
          addNotification(ID_BENEFICIARY_TX_ERROR, {
            subject: 'External Wallet address change failed',
            message: beneficiaryTxStatus.error,
          })
        }
      />
      <>
        <Floating.Anchor
          state={floatingNotificationState}
          className={twMerge(
            'flex items-center bg-white-150 size-9 min-w-9 rounded-full',
            isNotification && 'border border-solid border-pink-525',
          )}
        >
          <IconButton
            icon={<BellIcon className="text-blue-850 size-4 min-w-4" />}
            onClick={() => setShowNotificationsModal(!showNotificationsModal)}
          >
            {isNotification && <Dot />}
          </IconButton>
        </Floating.Anchor>
        {isMdScreen && (
          <Floating.Base
            state={floatingNotificationState}
            className="flex flex-col p-5 w-80 bg-white-50 rounded-3xl z-10 border border-solid gap-4"
          >
            <div className="text-xl font-bold text-blue-850">Notifications</div>
            {notificationsList}
          </Floating.Base>
        )}
      </>
      {!isMdScreen && (
        <ModalV2 isOpen={showNotificationsModal} onClose={() => setShowNotificationsModal(false)} className="gap-5">
          <div className="text-xl font-bold text-blue-850">Notifications</div>
          {notificationsList}
        </ModalV2>
      )}
    </>
  )
})

const Dot = () => (
  <div className="absolute size-2 min-w-2 rounded-full bg-pink-525 right-0 top-0.5 z-10 border border-solid border-white-150" />
)
