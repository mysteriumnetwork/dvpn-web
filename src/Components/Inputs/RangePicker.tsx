/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { themeCommon } from '../../theme/themeCommon'
import { devices } from '../../theme/themes'
import { Option } from '../../types/common'

const Content = styled.div`
  display: flex;
  gap: 5px;
  @media ${devices.tablet} {
    align-self: center;
    gap: 20px;
    margin: 0 10px 10px 10px;
  }
`

const StyledOption = styled.div`
  width: 120px;
  padding: 4px 0 4px 0;
  color: ${({ active }) => (active ? themeCommon.colorWhite : themeCommon.colorGrayBlue)};
  font-size: ${themeCommon.fontSizeSmall};
  font-weight: 400;
  font-style: normal;
  cursor: pointer;
  text-align: center;
  ${({ active }: { active?: boolean }) =>
    active &&
    `
    border-radius: 100px;
    background: ${themeCommon.colorKey};
  `}
  @media ${devices.tablet} {
    width: 90px;
  }
`

interface Props {
  options?: Option[]
  name?: string
  onChange?: (o: Option) => void
  value?: Option
}

export const RangePicker = ({ value, options = [], onChange = () => {} }: Props) => {
  return (
    <Content>
      {options?.map((o) => (
        <StyledOption key={o.value} active={value?.value === o.value} onClick={() => onChange(o)}>
          {o.label}
        </StyledOption>
      ))}
    </Content>
  )
}
