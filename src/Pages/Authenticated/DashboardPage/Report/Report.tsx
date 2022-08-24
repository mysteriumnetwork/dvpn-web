/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useFetch } from '../../../../commons/hooks'
import { tequila } from '../../../../api/tequila'
import ReportChart from './ReportChart'
import { ReportCard } from '../Stats/ReportCard'
import styled from 'styled-components'
import { CloudIcon, SessionsIcon, StopwatchIcon, WalletIcon } from '../../../../Components/Icons/Icons'
import { devices } from '../../../../theme/themes'
import { useEffect, useState } from 'react'
import dates from '../../../../commons/dates'
import { SESSIONS_V2_RESPONSE_EMPTY } from '../../../../constants/instances'
import { myst } from '../../../../commons/mysts'
import bytes from '../../../../commons/bytes'
import { MetricsRange, Option } from '../../../../types/common'
import { ChartData } from './types'
import series from './series'
import { ChartType } from './types'
import totals from './totals'
import { tooltipFormatter } from './PAIR_MAPPERS'

const { api } = tequila
const { seconds2Time } = dates
const { format } = bytes

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const CardRow = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bgReportChartRow};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  overflow-x: scroll;
  @media ${devices.tablet} {
    flex-direction: column;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`

const ChartRow = styled.div`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px 20px 0 20px;
  background: ${({ theme }) => theme.bgReportChartRow};
  z-index: 1;
  box-shadow: ${({ theme }) => theme.bgReportChartRowBoxShadow};
  @media ${devices.tablet} {
    overflow-x: auto;
    overflow-y: hidden;
  }
`

const RANGE_OPTIONS: Option<MetricsRange>[] = [
  { label: 'Last 24 hours', value: '1d' },
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
]

const GRAPH_OPTIONS = ['earnings', 'sessions', 'data'].map<Option>((r) => ({ value: r, label: r }))

interface Stats {
  totalEarningsEther: number
  totalSessions: number
  totalSessionTime: number
  totalTransferredBytes: number
}

export const Report = () => {
  const [selectedRange, setSelectedRange] = useState(RANGE_OPTIONS[0])
  const [selectedGraph, setSelectedGraph] = useState<Option<ChartType>>(GRAPH_OPTIONS[0])
  const [stats, setStats] = useState<Stats>({
    totalEarningsEther: 0,
    totalSessions: 0,
    totalSessionTime: 0,
    totalTransferredBytes: 0,
  })
  const [chartData, setChartData] = useState<ChartData>({ series: [], tooltipFormatter: () => '' })

  const [data = SESSIONS_V2_RESPONSE_EMPTY, loading] = useFetch(
    () => api.provider.sessions({ range: selectedRange.value }),
    [selectedRange],
  )

  useEffect(() => {
    if (loading) {
      return
    }

    setChartData((p) => ({
      ...p,
      series: series.pairs(data.sessions, selectedGraph.value as ChartType, selectedRange.value),
      units: series.units(selectedGraph.value),
      tooltipFormatter: tooltipFormatter(selectedGraph.value),
    }))

    setStats((p) => ({
      ...p,
      totalEarningsEther: totals.earnings(data.sessions),
      totalSessions: data.sessions.length,
      totalSessionTime: 0,
      totalTransferredBytes: totals.dataTransferredBytes(data.sessions),
    }))
  }, [selectedRange, selectedGraph, loading])

  return (
    <Column>
      <ChartRow>
        <ReportChart
          chartData={chartData}
          rangeOptions={RANGE_OPTIONS}
          selectedRange={selectedRange}
          onRangeChange={(o: Option) => setSelectedRange(o)}
          graphOptions={GRAPH_OPTIONS}
          selectedGraph={selectedGraph}
          onGraphChange={(o) => setSelectedGraph(o)}
        />
      </ChartRow>
      <CardRow>
        <ReportCard
          icon={<WalletIcon $accented />}
          value={myst.display(myst.toWeiBig(stats.totalEarningsEther), { fractionDigits: 3 })}
          title="Total Earnings"
        />
        <ReportCard icon={<SessionsIcon />} value={stats.totalSessions} title="Sessions" />
        <ReportCard icon={<StopwatchIcon />} value={seconds2Time(stats.totalSessionTime)} title="Session time" />
        <ReportCard
          icon={<CloudIcon />}
          value={format(stats.totalTransferredBytes)}
          title="Transferred"
          tooltip="Total transferred data"
        />
      </CardRow>
    </Column>
  )
}
