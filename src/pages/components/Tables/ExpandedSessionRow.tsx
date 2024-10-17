/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Row } from '@tanstack/react-table'
import { SessionV2 } from 'mysterium-vpn-js'
import { myst } from '../../../commons/mysts'
import dates from '../../../commons/dates'
import services from '../../../commons/services'
import bytes from '../../../commons/bytes'
import { twMerge } from 'tailwind-merge'

const { date2human } = dates
const { format } = bytes

type Props = {
  readonly row: Row<SessionV2>
  readonly className?: string
}

export const ExpandedSessionRow = ({ row, className }: Props) => {
  return (
    <div className={twMerge('flex flex-col px-4 gap-2', className)}>
      <ExpandedRow label="Earnings" value={myst.display(row.original.earnings.wei, { fractions: 5 })}></ExpandedRow>
      <ExpandedRow label="Started" value={date2human(row.original.startedAt)}></ExpandedRow>
      <ExpandedRow label="Services" value={services.name(row.original.serviceType)}></ExpandedRow>
      <ExpandedRow label="Transfered" value={format(row.original.transferredBytes)}></ExpandedRow>
      <ExpandedRow label="Session ID" value={row.original.id}></ExpandedRow>
    </div>
  )
}

const ExpandedRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    <div className="text-blue-850 font-bold text-sm w-[47%]">{label}</div>
    <div className="text-blue-850 text-sm font-normal w-[53%]">{value}</div>
  </div>
)

export default ExpandedSessionRow
