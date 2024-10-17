/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { SessionV2 } from 'mysterium-vpn-js'
import { ExpandRowToggle } from '../../../components/Table/ExpandRowToggle'
import { Tooltip } from '../../../components/Tooltip/Tooltip'
import services from '../../../commons/services'
import { myst } from '../../../commons/mysts'
import dates from '../../../commons/dates'
import bytes from '../../../commons/bytes'
import location from '../../../commons/location'

const { date2human, seconds2Time } = dates
const { format } = bytes
const { countryName } = location

const shortenId = (id: string, { firstPart = 4, lastPart = 14 }: { firstPart?: number; lastPart?: number } = {}) => {
  return id.slice(0, firstPart) + '...' + id.slice(-lastPart)
}

export const sessionsColumns = (): ColumnDef<SessionV2>[] => {
  return [
    {
      id: 'Country',
      header: 'Country',
      cell: ({ row: { original } }) => (
        <>
          <div className="xl:hidden 2xl:block w-[120px]">{countryName(original.consumerCountry)}</div>
          <Tooltip content={countryName(original.consumerCountry)}>
            <div className="hidden xl:block 2xl:hidden">{original.consumerCountry.toUpperCase()}</div>
          </Tooltip>
        </>
      ),
    },
    {
      id: 'Duration',
      header: 'Duration',
      cell: ({ row: { original } }) => <div className="w-[120px]">{seconds2Time(original.durationSeconds)}</div>,
    },
    {
      id: 'Started',
      minSize: 150,
      maxSize: 180,
      header: 'Started',
      cell: ({ row: { original } }) => <div>{date2human(original.startedAt)}</div>,
    },
    {
      id: 'Services',
      minSize: 160,
      maxSize: 180,
      header: 'Services',
      cell: ({ row: { original } }) => <div>{services.name(original.serviceType)}</div>,
    },
    {
      id: 'Earnings',
      minSize: 100,
      maxSize: 120,
      header: 'Earnings',
      cell: ({ row: { original } }) => (
        <div>
          {myst.display(original.earnings.wei, { fractions: 5, currency: false })}
          <span className="hidden xl:inline"> MYST</span>
        </div>
      ),
    },
    {
      id: 'Transferred',
      minSize: 100,
      maxSize: 120,
      header: 'Transferred',
      cell: ({ row: { original } }) => <div>{format(original.transferredBytes)}</div>,
    },
    {
      id: 'Session ID',
      header: 'Session ID',
      cell: ({ row: { original } }) => (
        <div>
          <Tooltip content={original.id}>
            <div className="hidden xl:block 2xl:hidden">{shortenId(original.id, { firstPart: 4, lastPart: 12 })}</div>
          </Tooltip>
          <div className="hidden 2xl:block">{original.id}</div>
        </div>
      ),
    },
    {
      id: 'Actions',
      minSize: 60,
      maxSize: 60,
      cell: ({ row }) => (
        <ExpandRowToggle
          className="w-full py-0.5"
          isExpanded={row.getIsExpanded()}
          onClick={row.getToggleExpandedHandler()}
        />
      ),
    },
  ]
}
