/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { Session, SessionStatus, SessionStats, SessionDirection } from 'mysterium-vpn-js'
import { CircularProgress } from '@material-ui/core'
import { Link } from 'react-router-dom'
import './SessionSidebar.scss'

import formatBytes, { add } from '../../../commons/formatBytes'
import { seconds2ISOTime } from '../../../commons/date.utils'
import { displayMyst } from '../../../commons/money.utils'
import { SESSIONS } from '../../../constants/routes'

import SessionCard from './SessionCard'

const sumBytes = (sessionStats?: SessionStats) => {
  return (sessionStats?.sumBytesSent || 0) + (sessionStats?.sumBytesReceived || 0)
}

const toSessionCard = (
  key: string,
  { id, consumerCountry, status, duration, bytesSent, bytesReceived, tokens }: Session,
): JSX.Element => {
  return (
    <SessionCard
      key={key}
      country={consumerCountry}
      status={status === SessionStatus.NEW}
      id={id}
      time={seconds2ISOTime(duration)}
      data={formatBytes(add(bytesSent, bytesReceived))}
      value={displayMyst(tokens)}
    />
  )
}

export interface Props {
  liveSessions?: Session[]
  liveSessionStats?: SessionStats
  displayNavigation?: boolean
  filterDirection?: SessionDirection
  filterProviderId?: string
  sessionsLimit?: number
  headerText: string
  historySessions?: Session[]
}

const SessionSidebar = ({
  liveSessions = [],
  liveSessionStats,
  displayNavigation,
  headerText,
  historySessions = [],
}: Props) => {
  const historyCards = historySessions.map((hs, idx) => toSessionCard(`${idx}h`, hs))
  const latestSessionCards = liveSessions.map((ls, idx) => toSessionCard(`${idx}l`, ls)).concat(historyCards)

  return (
    <div className="latest-sessions">
      <p className="latest-sessions__heading">{headerText}</p>
      <div className="latest-sessions__content">
        {!liveSessions ? (
          <div className="spinner">
            <CircularProgress disableShrink />
          </div>
        ) : (
          <div>{latestSessionCards || <div>No sessions</div>}</div>
        )}
      </div>
      {displayNavigation && (
        <div className="latest-sessions__button-block">
          <Link to={SESSIONS} className="btn btn--outline-primary">
            <span className="btn-text">View all sessions</span>
          </Link>
        </div>
      )}
      <div className="latest-sessions__footer">
        <div className="latest-sessions__footer__sum-block">
          <div className="name">{displayMyst(liveSessionStats?.sumTokens)}</div>
          <div className="explanation">Live earnings</div>
        </div>
        <div className="latest-sessions__footer__sum-block">
          <div className="name">{formatBytes(sumBytes(liveSessionStats))}</div>
          <div className="explanation">Live data</div>
        </div>
      </div>
    </div>
  )
}

export default SessionSidebar
