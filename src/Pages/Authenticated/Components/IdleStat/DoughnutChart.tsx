/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import styled from 'styled-components'

interface Props {
  data: { name: string; value: number }[]
  colorA: string
  colorB: string
}

const Wrapper = styled.div`
  width: 70px;
  height: 70px;
`

export const DoughnutChart = ({ data, colorA, colorB }: Props) => {
  return (
    <Wrapper>
      <ResponsiveContainer width="100%">
        <PieChart>
          <Pie data={data} stroke="none" innerRadius={12} outerRadius={30} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? colorA : colorB} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Wrapper>
  )
}
