/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState } from 'react'

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Media } from '../../../../commons/media'
import charts, { ChartType, Pair, types } from './chart.utils'
import styled from 'styled-components'
import { RangePicker } from './RangePicker'
import { GraphDropDown } from './GraphDropDown'
import { themeCommon } from '../../../../theme/themeCommon'
import { devices } from '../../../../theme/themes'
import { SessionStatsWithDate } from '../../../../types/api'

interface Props {
  sessionStats: SessionStatsWithDate[]
  handleRange: (a: number) => void
  selectedRange: number
}

interface StateProps {
  active: ChartType
  data: (arg: SessionStatsWithDate[]) => Pair[]
  dataName: string
}

const RANGES = [7, 30, 90]

const Charts = ({ sessionStats, handleRange, selectedRange }: Props) => {
  const [state, setState] = useState<StateProps>({
    active: 'earnings',
    data: charts.configByType('earnings').dataFunction,
    dataName: charts.configByType('earnings').dataName,
  })

  const changeGraph = (active: ChartType) => {
    const config = charts.configByType(active)
    setState({ ...state, active: active, data: config.dataFunction, dataName: config.dataName })
    console.log(state)
  }
  // const rangedStats = useMemo(() => {
  //   const dates = Object.keys(sessionStats)

  //   const ranged: { [date: string]: SessionStats } = {}
  //   for (let i = 0; i < selectedRange; i++) {
  //     if (!dates[i]) {
  //       break
  //     }
  //     ranged[dates[i]] = sessionStats[dates[i]]
  //   }

  //   return ranged
  // }, [selectedRange])

  return (
    <Chart>
      <Media.Desktop>
        <Header>
          <Title>Earnings Report</Title>
          <RangePicker options={RANGES} active={selectedRange} onChange={handleRange} />
          <FlexGrow />
          <GraphDropDown onChange={changeGraph} options={Object.keys(types).map((t) => ({ value: t, name: t }))} />
        </Header>
      </Media.Desktop>
      <Media.Mobile>
        <Header>
          <Row>
            <Title>Earnings Report</Title>
            {/* TODO: Figure out why select options bug and show in the wrong place */}
            <GraphDropDown onChange={changeGraph} options={Object.keys(types).map((t) => ({ value: t, name: t }))} />
          </Row>
          <RangePicker options={RANGES} active={selectedRange} onChange={handleRange} />
        </Header>
      </Media.Mobile>
      <ChartOverrides>
        <ResponsiveContainer width="100%" minWidth={700} maxHeight={320} aspect={4.0 / 3.0}>
          <AreaChart
            width={500}
            height={300}
            data={state.data(sessionStats)}
            margin={{
              top: 5,
              right: 50,
              left: 25,
              bottom: 30,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor={themeCommon.colorKey} stopOpacity={0.1} />
                <stop offset="90%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="#eee" />
            <XAxis dataKey="x" tickMargin={20} />
            <YAxis
              tick={{ width: 250 }}
              tickMargin={10}
              ticks={charts.ticks(state.data(sessionStats))}
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
              stroke={themeCommon.colorKey}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartOverrides>
    </Chart>
  )
}

const Chart = styled.div`
  color: ${({ theme }) => theme.text.colorMain};
`
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  @media ${devices.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    width: 100%;
  }
`

const FlexGrow = styled.div`
  flex-grow: 1;
`
const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
const Title = styled.div`
  font-size: ${themeCommon.fontSizeBig};
  font-weight: 700;
  font-family: Ubuntu;
  margin-right: 60px;
`

const ChartOverrides = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
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
    font-size: ${themeCommon.fontSizeSmall};
    line-height: 21px;
  }

  .recharts-default-tooltip {
    background: ${themeCommon.colorWhite};
    box-shadow: 0 8px 15px rgba(152, 169, 188, 0.267182);
    border-radius: 2px;
    border: none !important;
  }

  .recharts-tooltip-label {
    font-family: 'Ubuntu', sans-serif;
    font-style: normal;
    font-size: ${themeCommon.fontSizeNormal};
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
