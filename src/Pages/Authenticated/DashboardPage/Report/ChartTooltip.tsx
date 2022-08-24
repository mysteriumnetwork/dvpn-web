/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'

interface Props {
  active?: boolean
  value?: string
  label?: any
  units?: string
}

const StyledTooltip = styled.div`
  color: ${({ theme }) => theme.tooltip.textColor};
  background-color: ${({ theme }) => theme.tooltip.background};
  border-radius: 100px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  line-height: 22px;
  padding: 4px;
`

export const ChartTooltip = ({ active, label, value, units }: Props) => {
  if (!active || !value) {
    return <></>
  }
  return <StyledTooltip>{`${value} ${units ? `(${units})` : ''}`}</StyledTooltip>
}
