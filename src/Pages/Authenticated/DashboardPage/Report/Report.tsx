/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useFetch } from '../../../../commons/hooks'
import { tequila } from '../../../../api/tequila'
import ReportGraph from '../Charts/ReportGraph'
import { ReportCard } from '../Stats/ReportCard'
import styled from 'styled-components'
import { CloudIcon, SessionsIcon, StopwatchIcon, WalletIcon } from '../../../../Components/Icons/Icons'
import { themeCommon } from '../../../../theme/themeCommon'
import { devices } from '../../../../theme/themes'
import { useEffect, useState } from 'react'
import dates from '../../../../commons/dates'
import { SESSION_STATS_WITH_BYTE_TOTAL_EMPTY, SESSIONS_V2_RESPONSE_EMPTY } from '../../../../constants/instances'
import { SessionStatsWithByteTotal } from '../../../../types/api'
import { myst } from '../../../../commons/mysts'
import bytes from '../../../../commons/bytes'
import { Option } from '../../../../types/common'
import { ChartData } from '../Charts/types'
import series from './series'
import { ChartType } from './types'

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
  justify-content: space-between;

  background: ${({ theme }) => theme.bgReportChartRow};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  padding-top: 20px;
  padding-bottom: 20px;
  @media ${devices.tablet} {
    flex-direction: column;
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

const BorderRight = styled.div`
  border-right: 1px dashed ${themeCommon.colorGrayBlue2}80;
`
const RANGE_OPTIONS = ['7d', '30d'].map<Option>((r) => ({ value: r, label: r }))
const GRAPH_OPTIONS = ['earnings', 'sessions', 'data'].map<Option>((r) => ({ value: r, label: r }))

interface ReportStats {
  totals: SessionStatsWithByteTotal
  diff: SessionStatsWithByteTotal
}

export const Report = () => {
  const [selectedRange, setSelectedRange] = useState(RANGE_OPTIONS[0])
  const [selectedGraph, setSelectedGraph] = useState(GRAPH_OPTIONS[0])
  const [chartData, setChartData] = useState<ChartData>({ series: [] })
  const [reportStats] = useState<ReportStats>({
    totals: SESSION_STATS_WITH_BYTE_TOTAL_EMPTY,
    diff: SESSION_STATS_WITH_BYTE_TOTAL_EMPTY,
  })

  useFetch(() => Promise.all([api.sessionStatsDaily()]))

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
      units: series.units(selectedGraph.value as ChartType),
    }))
  }, [selectedRange, selectedGraph, loading])

  return (
    <Column>
      <ChartRow>
        <ReportGraph
          chartData={chartData}
          rangeOptions={RANGE_OPTIONS}
          onRangeChange={(o: Option) => setSelectedRange(o)}
          selectedRange={selectedRange}
          graphOptions={GRAPH_OPTIONS}
          onGraphChange={(o) => setSelectedGraph(o)}
          selectedGraph={selectedGraph}
        />
      </ChartRow>
      <CardRow>
        <ReportCard
          icon={<WalletIcon $accented />}
          value={myst.display(reportStats.totals.sumTokens, { fractionDigits: 3 })}
          title="Total Earnings"
          diff={Number(myst.display(reportStats.diff.sumTokens, { fractionDigits: 3, showCurrency: false }))}
        />
        <BorderRight />
        <ReportCard
          icon={<SessionsIcon />}
          value={reportStats.totals.count}
          title="Sessions"
          diff={reportStats.diff.count}
        />
        <BorderRight />
        <ReportCard
          icon={<StopwatchIcon />}
          value={seconds2Time(reportStats.totals.sumDuration)}
          title="Session time"
          diff={Math.floor(reportStats.diff.sumDuration / 3600)}
        />
        <BorderRight />
        <ReportCard
          icon={<CloudIcon />}
          value={format(reportStats.totals.byteTotal)}
          title="Transferred"
          diff={parseFloat((reportStats.diff.byteTotal / 1_000_000_000).toFixed(2))}
        />
      </CardRow>
    </Column>
  )
}
