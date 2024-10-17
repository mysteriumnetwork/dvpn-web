/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PropsWithChildren } from 'react'
import Card, { CardProps } from '../../../components/Cards/Card'
import Label from '../../../components/Typography/Label'

type Props = {
  readonly title?: string
} & CardProps

export const PanelCard = ({ title, children, ...props }: PropsWithChildren<Props>) => {
  return (
    <Card fluid {...props}>
      {title && <Label value={title} className="text-pink-525 mb-4" />}
      {children}
    </Card>
  )
}
