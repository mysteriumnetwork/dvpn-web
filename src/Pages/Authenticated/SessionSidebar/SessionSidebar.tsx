/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Session, SessionStatus, SessionStats, SessionDirection } from 'mysterium-vpn-js'
import { Link } from 'react-router-dom'
import styles from './SessionSidebar.module.scss'
import { countryName } from '../../../commons/country'

import formatBytes, { add } from '../../../commons/formatBytes'
import { date2human, seconds2Time } from '../../../commons/date.utils'
import { SESSIONS } from '../../../constants/routes'

import SessionCard from '../Components/SessionCard/SessionCard'
import { myst } from '../../../commons/myst.utils'

const sumBytes = (sessionStats?: SessionStats) => {
  return (sessionStats?.sumBytesSent || 0) + (sessionStats?.sumBytesReceived || 0)
}

const toSessionCard = (
  key: string,
  { id, consumerCountry, status, duration, bytesSent, bytesReceived, tokens, createdAt }: Session,
): JSX.Element => {
  return (
    <div key={key} className={styles.session}>
      <SessionCard
        country={countryName(consumerCountry)}
        onGoing={status === SessionStatus.NEW}
        id={id}
        time={seconds2Time(duration)}
        data={formatBytes(add(bytesSent, bytesReceived))}
        value={myst.display(tokens)}
        createdAt={date2human(createdAt)}
      />
    </div>
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
  const historyCards = historySessions.map((hs, idx) => toSessionCard(hs.id, hs))
  const latestSessionCards = liveSessions.map((ls, idx) => toSessionCard(ls.id, ls)).concat(historyCards)

  return (
    <div className={styles.sessions}>
      <p className={styles.header}>{headerText}</p>
      <div className={styles.content}>
        {latestSessionCards.length === 0 ? <div className={styles.empty}>No sessions</div> : latestSessionCards}
      </div>
      {displayNavigation && (
        <div className={styles.controls}>
          <Link to={SESSIONS} className="btn btn--outline-primary">
            <span className="btn-text">View all sessions</span>
          </Link>
        </div>
      )}
      <div className={styles.footer}>
        <div className={styles.footerSumBlock}>
          <div className={styles.name}>{myst.display(liveSessionStats?.sumTokens)}</div>
          <div className={styles.explanation}>Live earnings</div>
        </div>
        <div className={styles.footerSumBlock}>
          <div className={styles.name}>{formatBytes(sumBytes(liveSessionStats))}</div>
          <div className={styles.explanation}>Live data</div>
        </div>
      </div>
    </div>
  )
}

export default SessionSidebar
