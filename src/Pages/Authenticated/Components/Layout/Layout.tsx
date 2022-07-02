/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './Layout.module.scss'
import Header from '../../../../Components/Header/Header'
import React from 'react'
import { FullPageSpinner } from '../Spinner/FullPageSpinner'
import { selectors } from '../../../../redux/selectors'
import { useAppSelector } from '../../../../commons/hooks'

interface Props {
  title?: string
  logo?: JSX.Element
  main?: React.ReactNode
  isLoading?: boolean
}

export const Layout = ({ logo, title, main, isLoading }: Props) => {
  const isSSELoading = useAppSelector(selectors.isSSELoading)

  const showSpinner = isLoading || isSSELoading

  return (
    <main className={styles.layout}>
      <div className={styles.header}>
        <Header logo={logo} name={title} />
      </div>
      <div className={styles.content}>
        {showSpinner && <FullPageSpinner />}
        {main}
      </div>
    </main>
  )
}
