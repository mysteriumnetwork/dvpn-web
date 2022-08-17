/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { Option } from '../../../../types/common'
import { themeCommon } from '../../../../theme/themeCommon'
import { Select } from '../../../../Components/Inputs/Select'

const StyledSelect = styled(Select)`
  background: ${themeCommon.colorDarkBlue};
  color: ${themeCommon.colorWhite};
  padding: 5px;
  border-radius: 100px;
  min-width: 100px;
  font-size: ${themeCommon.fontSizeSmall};
`

interface Props {
  onChange: (o: Option) => void
  options?: Option[]
  value: Option
}

export const GraphDropDown = ({ onChange, options = [], value }: Props) => {
  return <StyledSelect id="graphs" value={value} options={options} onChange={(e) => onChange(e as Option)} />
}
