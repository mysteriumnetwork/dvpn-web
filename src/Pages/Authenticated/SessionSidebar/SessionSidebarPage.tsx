/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import './SessionSidebar.scss'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/wallet/logo.svg'
import Header from '../../../Components/Header'
import React from 'react'
import SessionSidebar from './SessionSidebar'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { SSEState } from '../../../redux/sse.slice'

const SessionSidebarPage = () => {
  const sse = useSelector<RootState, SSEState>(({ sse }) => sse)
  return (
    <div className="main">
      <div className="main-block">
        <Header logo={Logo} name="Sessions Sidebar" />
        <SessionSidebar
          liveSessions={sse.appState?.sessions}
          liveSessionStats={sse.appState?.sessionsStats}
          headerText="Live Sessions"
        />
      </div>
    </div>
  )
}

export default SessionSidebarPage
