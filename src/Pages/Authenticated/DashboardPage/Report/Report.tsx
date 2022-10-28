/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useFetch } from '../../../../commons/hooks'
import ReportChart from './ReportChart'
import { ReportCard } from '../Stats/ReportCard'
import styled from 'styled-components'
import { CloudIcon, SessionsIcon, StopwatchIcon, WalletIcon } from '../../../../Components/Icons/Icons'
import { devices } from '../../../../theme/themes'
import { useEffect, useState } from 'react'
import dates from '../../../../commons/dates'
import { myst } from '../../../../commons/mysts'
import bytes from '../../../../commons/bytes'
import { MetricsRange, Option } from '../../../../types/common'
import { ChartData, ChartType } from './types'
import series from './series'
import { tooltipFormatter } from './chart.tooltip'
import { alphaToHex, themeCommon } from '../../../../theme/themeCommon'
import { SESSIONS_V2_RESPONSE_EMPTY } from '../../../../constants/instances'
import { tequila } from '../../../../api/tequila'
import totals from './totals'
import zIndexes from '../../../../constants/z-indexes'
import { CircularSpinner } from '../../../../Components/CircularSpinner/CircularSpinner'

const { seconds2Time } = dates
const { format } = bytes

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.report.bgReportCardRow};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow-x: auto;

  > :not(:last-of-type) {
    border-right: 1px dashed ${({ theme }) => theme.common.colorGrayBlue + alphaToHex(0.5)};
  }

  > * {
    width: 100%;
  }

  @media ${devices.tablet} {
    > * {
      border-right: none !important;
    }
    > :not(:last-of-type) {
      border-bottom: 1px dashed ${({ theme }) => theme.common.colorGrayBlue + alphaToHex(0.5)};
    }
  }

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
  background: ${({ theme }) => theme.report.bgReportCardRow};
  z-index: 1;
  box-shadow: ${({ theme }) => theme.report.chart.shadow};
  overflow: hidden;
  @media ${devices.tablet} {
    overflow-x: auto;
    overflow-y: hidden;
  }
`

const Spinner = styled(CircularSpinner)`
  width: 4em;
  height: 4em;
`

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${themeCommon.colorDarkBlue + alphaToHex(0.3)};
  z-index: ${zIndexes.overlay};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
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

  const [seriesData = [], loadingSeries] = useFetch(() => series.pairs(selectedRange.value, selectedGraph.value), [
    selectedRange.value,
    selectedGraph.value,
  ])

  const [sessionsData = SESSIONS_V2_RESPONSE_EMPTY, loadingSessions] = useFetch(
    () => tequila.api.provider.sessions({ range: selectedRange.value }),
    [selectedRange],
  )

  const loading = loadingSeries || loadingSessions

  useEffect(() => {
    if (loading) {
      return
    }

    setChartData((p) => ({
      ...p,
      series: seriesData,
      units: series.units(selectedGraph.value),
      tooltipFormatter: tooltipFormatter(selectedGraph.value),
    }))

    setStats((p) => ({
      ...p,
      totalEarningsEther: totals.earnings(sessionsData.sessions),
      totalSessions: sessionsData.sessions.length,
      totalSessionTime: totals.durationSeconds(sessionsData.sessions),
      totalTransferredBytes: totals.dataTransferredBytes(sessionsData.sessions),
    }))
  }, [selectedRange, selectedGraph, loading])

  return (
    <Column data-test-id="Report.chart">
      {loading && (
        <Overlay>
          <Spinner />
        </Overlay>
      )}
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
          value={myst.display(myst.toWeiBig(stats.totalEarningsEther), { fractions: 3 })}
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
