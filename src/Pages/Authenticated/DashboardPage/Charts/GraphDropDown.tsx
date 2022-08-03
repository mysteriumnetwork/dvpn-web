/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { Option } from '../../../../types/common'
import { themeCommon } from '../../../../theme/themeCommon'
import { ChartType } from './chart.utils'
const StyledSelect = styled.select`
  background: ${themeCommon.colorDarkBlue};
  color: ${themeCommon.colorWhite};
  padding: 5px;
  border-radius: 100px;
  min-width: 100px;
  font-size: ${themeCommon.fontSizeSmall};
`

interface Props {
  onChange: (value: ChartType) => void
  options?: Option[]
}

export const GraphDropDown = ({ onChange, options = [] }: Props) => {
  return (
    <StyledSelect
      name="graphs"
      id="graphs"
      onChange={(e) => {
        const value = e.target.value as ChartType
        onChange(value)
        console.log(value)
      }}
    >
      {options?.map((o) => (
        <option key={o.value} value={o.value}>
          {o.name}
        </option>
      ))}
    </StyledSelect>
  )
}
