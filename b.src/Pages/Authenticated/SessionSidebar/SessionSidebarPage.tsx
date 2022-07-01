/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/sessionsSidebar/logo.svg'
import React from 'react'
import SessionSidebar from './SessionSidebar'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { SSEState } from '../../../redux/sse.slice'
import { Layout } from '../Layout'

const SessionSidebarPage = () => {
  const sse = useSelector<RootState, SSEState>(({ sse }) => sse)
  return (
    <Layout
      title="Sessions Sidebar"
      logo={<Logo />}
      main={
        <SessionSidebar
          liveSessions={sse.appState?.sessions}
          liveSessionStats={sse.appState?.sessionsStats}
          headerText="Live Sessions"
        />
      }
    />
  )
}

export default SessionSidebarPage
