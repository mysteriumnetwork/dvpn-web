/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import themes from '../../../../commons/themes'
import { Option } from '../../../../types/common'

const StyledSelect = styled.select`
  background: ${themes.common.colorDarkBlue};
  color: ${themes.common.colorWhite};
  padding: 5px;
  border-radius: 100px;
  min-width: 100px;
  font-size: ${themes.common.fontSizeSmall};
`

interface Props {
  onChange?: (value: string) => void
  options?: Option[]
}

export const GraphDropDown = ({ onChange = () => {}, options = [] }: Props) => {
  return (
    <StyledSelect
      name="graphs"
      id="graphs"
      onChange={(e) => {
        const { value } = e.target
        onChange(value)
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
