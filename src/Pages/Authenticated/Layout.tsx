/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './Layout.module.scss'
import classNames from 'classnames'
import Header from '../../Components/Header/Header'
import React from 'react'
import { media } from '../../commons/media.utils'

interface Props {
  title?: string
  logo?: JSX.Element
  topRight?: JSX.Element
  main?: JSX.Element
  showSideBar?: boolean
  sidebar?: JSX.Element
}

export const Layout = ({ logo, title, main, showSideBar, sidebar, topRight }: Props) => {
  const showSideBarAdjusted = showSideBar && media.isDesktopQuery
  return (
    <main className={styles.main}>
      <div className={classNames(styles.mainBlock, showSideBarAdjusted && styles.mainBlockSplit)}>
        <div className={styles.header}>
          <Header logo={logo} name={title} />
          {topRight}
        </div>
        {main}
      </div>
      {showSideBarAdjusted && <div className={styles.sidebarBlock}>{sidebar}</div>}
    </main>
  )
}
