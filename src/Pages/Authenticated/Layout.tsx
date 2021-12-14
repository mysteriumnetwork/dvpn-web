/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './Layout.module.scss'
import classNames from 'classnames'
import Header from '../../Components/Header'
import React from 'react'

interface Props {
  title?: string
  logo?: any
  main?: any
  showSideBar?: boolean
  sidebar?: any
}

export const Layout = ({ logo, title, main, showSideBar, sidebar }: Props) => {
  return (
    <main className={styles.main}>
      <div className={classNames(styles.mainBlock, showSideBar && styles.mainBlockSplit)}>
        <Header logo={logo} name={title} />
        {main}
      </div>
      {showSideBar && <div className={styles.sidebarBlock}>{sidebar}</div>}
    </main>
  )
}
