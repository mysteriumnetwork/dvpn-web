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
import { GraphDropDown } from './GraphDropDown'
import { types } from './chart.utils'

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
        <FlexGrow />
        <GraphDropDown options={Object.keys(types).map((t) => ({ value: t, name: t }))} />
      </Header>

      <ChartOverrides>
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
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor={themes.current().colorKey} stopOpacity={0.1} />
                <stop offset="90%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
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
              // style={{ strokeDasharray: `40% 60%` }}
              type="monotone"
              dataKey="y"
              fill="url(#colorUv)"
              fillOpacity={2}
              strokeWidth={2}
              fillRule={'evenodd'}
              stroke={themes.current().colorKey}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartOverrides>
    </Chart>
  )
}

const Chart = styled.div`
  color: ${themes.current().colorDarkBlue};
`
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`

const FlexGrow = styled.div`
  flex-grow: 1;
`

const Title = styled.div`
  font-size: ${themes.current().fontSizeBig};
  font-weight: 700;
  font-family: Ubuntu;
  margin-right: 60px;
`

const ChartOverrides = styled.div`
  .recharts-curve.recharts-area-area {
  }

  .recharts-cartesian-axis-line {
    display: none;
  }

  .recharts-cartesian-grid-vertical {
    display: none;
  }

  .recharts-layer.recharts-line-dots {
    display: none;
  }

  .recharts-cartesian-axis-tick-line {
    display: none;
  }

  .recharts-area {
    fill: none;
  }

  .recharts-text.recharts-cartesian-axis-tick-value {
    font-family: 'Ubuntu', sans-serif;
    font-style: normal !important;
    font-size: ${themes.current().fontSizeSmall};
    line-height: 21px;
  }

  .recharts-default-tooltip {
    background: ${themes.current().colorWhite};
    box-shadow: 0 8px 15px rgba(152, 169, 188, 0.267182);
    border-radius: 2px;
    border: none !important;
  }

  .recharts-tooltip-label {
    font-family: 'Ubuntu', sans-serif;
    font-style: normal;
    font-size: ${themes.current().fontSizeNormal};
    line-height: 21px;
  }

  .recharts-tooltip-item-list li {
    font-family: 'Ubuntu', sans-serif !important;
    font-style: normal;
    font-size: 14px !important;
    line-height: 21px !important;
  }
`

export default Charts
