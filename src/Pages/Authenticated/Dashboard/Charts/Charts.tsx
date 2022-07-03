/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useMemo, useState } from 'react'
import { SessionStats } from 'mysterium-vpn-js'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import charts, { ChartType, Pair } from './chart.utils'
import './ChartsOverrides.scss'
import themes from '../../../../commons/themes'
import styled from 'styled-components'
import { RangePicker } from './RangePicker'

const Chart = styled.div``
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`

const Title = styled.div`
  font-size: ${themes.current().fontSizeBig};
  font-weight: 700;
  font-family: Poppins;
  margin-right: 60px;
`

interface Props {
  statsDaily: {
    [date: string]: SessionStats
  }
}

interface StateProps {
  active: ChartType
  data: (arg: { [p: string]: SessionStats }) => Pair[]
  dataName: string
  selectedRange: number
}

const RANGES = [7, 30, 90]

const Charts = ({ statsDaily }: Props) => {
  const [state, setState] = useState<StateProps>({
    active: 'earnings',
    data: charts.configByType('earnings').dataFunction,
    dataName: charts.configByType('earnings').dataName,
    selectedRange: RANGES[0],
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const changeGraph = (active: ChartType) => {
    const config = charts.configByType(active)
    setState({ ...state, active: active, data: config.dataFunction, dataName: config.dataName })
  }

  const handleRange = (range: number) => {
    setState((p) => ({ ...p, selectedRange: range }))
  }

  const rangedStats = useMemo(() => {
    const dates = Object.keys(statsDaily)

    const ranged: { [date: string]: SessionStats } = {}
    for (let i = 0; i < state.selectedRange; i++) {
      if (!dates[i]) {
        break
      }
      ranged[dates[i]] = statsDaily[dates[i]]
    }

    return ranged
  }, [state.selectedRange])

  return (
    <Chart>
      <Header>
        <Title>Earnings Report</Title>
        <RangePicker options={RANGES} active={state.selectedRange} onChange={handleRange} />
        {/*<div className="chart__header-buttons">
          {Object.keys(types).map((type) => {
            return (
              <div
                key={type}
                className={values.active === type ? 'control-btn active' : 'control-btn'}
                onClick={() => changeGraph(type as ChartType)}
              >
                {types[type].name}
              </div>
            )
          })}
        </div>*/}
      </Header>

      <div className="graphOverride">
        <ResponsiveContainer width="100%" maxHeight={320} aspect={4.0 / 3.0}>
          <AreaChart
            width={500}
            height={300}
            data={state.data(rangedStats)}
            margin={{
              top: 5,
              right: 50,
              left: 25,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#eee" />
            <XAxis dataKey="x" tickMargin={20} />
            <YAxis
              tick={{ width: 250 }}
              tickMargin={10}
              ticks={charts.ticks(state.data(rangedStats))}
              dataKey="y"
              unit={state.dataName}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="y"
              fill={`${themes.current().colorPrimary}1F`}
              fillOpacity={2}
              strokeWidth={2}
              fillRule={'evenodd'}
              stroke={themes.current().colorPrimary}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Chart>
  )
}

export default Charts
