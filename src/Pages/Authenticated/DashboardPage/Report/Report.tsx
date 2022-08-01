/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useFetch } from '../../../../commons/hooks'
import { tequila } from '../../../../api/tequila'
import Charts from '../Charts/Charts'
import { SessionStats } from 'mysterium-vpn-js/lib/session/session'
import { ReportCard } from '../Stats/ReportCard'
import styled from 'styled-components'
import { CloudIcon, SessionsIcon, StopwatchIcon, WalletIcon } from '../../../../Components/Icons/Icons'
import { themeCommon } from '../../../../theme/themeCommon'
import { devices } from '../../../../theme/themes'
import { useMemo, useState } from 'react'
import dates from '../../../../commons/dates'
import { SESSIONS_STATS_DAILY_RESPONSE_EMPTY } from '../../../../constants/instances'
import _ from 'lodash'
import charts from '../Charts/chart.utils'

const { api } = tequila
const { days2Ms } = dates

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
const RANGES = [7, 30, 90]

interface StateProps {
  selectedRange: number
  dateTo: string
  dateFrom: string
}

export const Report = () => {
  const [state, setState] = useState<StateProps>({
    selectedRange: RANGES[0],
    dateTo: new Date(Date.now()).toISOString().split('T')[0],
    dateFrom: new Date(Date.now() - days2Ms(RANGES[0] * 2 - 1)).toISOString().split('T')[0],
  })
  useFetch(() => Promise.all([api.sessionStatsDaily()]))

  // const chartStats: { [k: string]: SessionStats } = useMemo(() => {
  //   const day = 1000 * 60 * 60 * 24
  //
  //   const period = 60
  //
  //   const res: { [k: string]: SessionStats } = {}
  //   for (let i = 0; i < period; i++) {
  //     const d = new Date(Date.now() - day * (period / 2) + day * (i + 1)).toISOString().split('T')[0]
  //     res[d] = {
  //       count: Math.floor(Math.random() * 20),
  //       countConsumers: Math.floor(Math.random() * 30),
  //       sumBytesReceived: Math.floor(Math.random() * 100) * 1000,
  //       sumBytesSent: Math.floor(Math.random() * 100) * 500000,
  //       sumDuration: Math.floor(Math.random() * 100) * 10,
  //       sumTokens: Math.floor(Math.random() * 100) * 10000000000000000,
  //     }
  //   }
  //
  //   return res
  // }, [])

  const [chartStats, setChartStats] = useState<{ [date: string]: SessionStats }>({})

  const [data = SESSIONS_STATS_DAILY_RESPONSE_EMPTY, loading] = useFetch(
    () => api.sessionStatsDaily({ dateFrom: state.dateFrom, dateTo: state.dateTo }),
    [state.dateFrom],
  )
  const handleRange = (range: number) => {
    setState((p) => ({
      ...p,
      selectedRange: range,
      dateFrom: new Date(Date.now() - days2Ms(range * 2 - 1)).toISOString().split('T')[0],
    }))
  }

  const halfPeriodSlice = (items: { [p: string]: SessionStats }) => ({
    diffStats: _.chain(Object.entries(items).slice(0, state.selectedRange)).keyBy('0').mapValues('1').value(),
    displayStats: _.chain(Object.entries(items).slice(state.selectedRange, state.selectedRange * 2))
      .keyBy('0')
      .mapValues('1')
      .value(),
  })

  useMemo(() => {
    if (!loading) {
      const halfPeriodStats = halfPeriodSlice(data.items)
      const diffs = charts.calculateDiffs(halfPeriodStats.diffStats, halfPeriodStats.displayStats)

      setChartStats(halfPeriodStats.displayStats)
    }
  }, [state.dateFrom, loading])

  return (
    <Column>
      <ChartRow>
        <Charts sessionStats={chartStats} handleRange={handleRange} selectedRange={state.selectedRange} />
      </ChartRow>
      <CardRow>
        <ReportCard icon={<WalletIcon $accented />} value="35.34" title="Total Settled earnings" diff={0.56} />
        <BorderRight />
        <ReportCard icon={<SessionsIcon />} value="35.34" title="Total Settled earnings" diff={0.56} />
        <BorderRight />
        <ReportCard icon={<StopwatchIcon />} value="35.34" title="Total Settled earnings" diff={0.56} />
        <BorderRight />
        <ReportCard icon={<CloudIcon />} value="-35.34" title="Total Settled earnings" diff={-0.56} />
      </CardRow>
    </Column>
  )
}
