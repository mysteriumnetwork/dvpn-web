/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ReactNode } from 'react'
import Card from '../../../components/Cards/Card'

export type NotificationProps = {
  readonly subject: string
  readonly message: ReactNode
}

export const Notification = ({ subject, message }: NotificationProps) => {
  return (
    <Card className="min-h-[88px] w-full p-4 border border-white-175">
      <div className="flex flex-col gap-2">
        <div className="text-base font-bold text-blue-850">{subject}</div>
        {typeof message === 'string' ? <div className="flex flex-col gap-1.5 text-xs">{message}</div> : message}
      </div>
    </Card>
  )
}
