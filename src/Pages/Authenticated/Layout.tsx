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
import { media } from '../../commons/media'
import { FullPageSpinner } from './Components/Spinner/FullPageSpinner'
import { useMediaQuery } from 'react-responsive'
import { useSelector } from 'react-redux'
import { selectors } from '../../redux/selectors'

interface Props {
  title?: string
  logo?: JSX.Element
  topRight?: JSX.Element
  main?: JSX.Element
  showSideBar?: boolean
  sidebar?: JSX.Element
  isLoading?: boolean
}

export const Layout = ({ logo, title, main, showSideBar, sidebar, topRight, isLoading }: Props) => {
  const isSSELoading = useSelector(selectors.isSSELoading)
  const isDesktop = useMediaQuery(media.isDesktopQuery)
  const showSideBarAdjusted = isDesktop && showSideBar

  const showSpinner = isLoading || isSSELoading

  return (
    <main className={styles.main}>
      <div className={classNames(styles.mainBlock, showSideBarAdjusted && styles.mainBlockSplit)}>
        <div className={styles.header}>
          <Header logo={logo} name={title} />
          {topRight}
        </div>
        {showSpinner && <FullPageSpinner />}
        {main}
      </div>
      {showSideBarAdjusted && <div className={styles.sidebarBlock}>{sidebar}</div>}
    </main>
  )
}
