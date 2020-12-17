/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import './SessionCard.scss'

interface Props {
  country: string
  status: boolean
  id: string
  time: string
  data: string
  value: string
}

const SessionCard = ({ country, status, id, time, data, value }: Props): JSX.Element => {
  return (
    <div className="session">
      <div className="session__header">
        <div className="title">{country}</div>
        <div className={status ? 'status status--success' : 'status status--failed'}>{status ? 'Ongoing' : ''}</div>
      </div>
      <div className="session__id">{id}</div>
      <div className="session__statistics">
        <div className="statistic">{time}</div>
        <div className="statistic">{data}</div>
        <div className="statistic">{value}</div>
      </div>
    </div>
  )
}

export default SessionCard
