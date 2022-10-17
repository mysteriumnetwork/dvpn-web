/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Media } from '../../../../commons/media'
import charts from './chart.utils'
import styled, { useTheme } from 'styled-components'
import { themeCommon } from '../../../../theme/themeCommon'
import { devices } from '../../../../theme/themes'
import { RangePicker } from '../../../../Components/Inputs/RangePicker'
import { Option } from '../../../../types/common'
import { capitalizeFirstLetter } from '../../../../commons'
import { ChartData } from './types'
import { ChartTooltip } from './ChartTooltip'
import { Select } from '../../../../Components/Inputs/Select'

interface Props {
  chartData: ChartData
  graphOptions: Option[]
  onGraphChange: (o: Option) => void
  selectedGraph: Option

  rangeOptions: Option[]
  onRangeChange: (o: Option) => void
  selectedRange: Option
}

const ReportChart = ({
  chartData,
  onRangeChange,
  selectedRange,
  rangeOptions,
  graphOptions,
  selectedGraph,
  onGraphChange,
}: Props) => {
  const theme = useTheme()
  return (
    <Chart>
      <Media.Desktop>
        <Header>
          <Title>{capitalizeFirstLetter(selectedGraph.value)} Report</Title>
          <RangePicker options={rangeOptions} value={selectedRange} onChange={onRangeChange} />
          <FlexGrow />
          <Select onChange={onGraphChange} options={graphOptions} value={selectedGraph} isSearchable={false} />
        </Header>
      </Media.Desktop>
      <Media.Mobile>
        <Header>
          <Row>
            <Title>Earnings Report</Title>
            <Select onChange={onGraphChange} options={graphOptions} value={selectedGraph} isSearchable={false} />
          </Row>
          <RangePicker options={rangeOptions} value={selectedRange} onChange={onRangeChange} />
        </Header>
      </Media.Mobile>
      <ChartOverrides>
        <ResponsiveContainer width="100%" minWidth={700} maxHeight={320} aspect={4.0 / 3.0}>
          <AreaChart
            width={500}
            height={300}
            data={chartData.series}
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
            <XAxis
              dataKey="x"
              tickMargin={20}
              tick={{
                fill: theme.report.chart.yTickFontColor,
                fontSize: theme.common.fontSizeSmall,
                fontWeight: '400',
              }}
            />
            <YAxis
              tick={{
                width: 250,
                fill: theme.report.chart.xTickFontColor,
                fontSize: theme.common.fontSizeSmall,
                fontWeight: '400',
              }}
              tickCount={0}
              tickMargin={10}
              ticks={charts.ticks(chartData.series)}
              dataKey="y"
              unit={chartData.units}
            />
            <Tooltip
              content={({ active, payload, label }) => (
                <ChartTooltip
                  active={active}
                  value={chartData.tooltipFormatter((payload ?? [])[0]?.value as string)}
                  label={label}
                />
              )}
            />
            <Area
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
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  font-weight: 700;
  margin-right: 60px;
  @media ${devices.laptopL} {
    width: 8em;
  }
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

export default ReportChart
