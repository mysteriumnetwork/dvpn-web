/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classNames from 'classnames'
import { ReactNode } from 'react'
import styles from './Card.module.scss'

interface Props {
  children?: ReactNode
  className?: string
  span?: number
}

export const Card = ({ children, className, span = 1 }: Props) => {
  return (
    <div className={classNames(styles.card, className)} style={{ flexGrow: span }}>
      {children}
    </div>
  )
}
