/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { themeCommon } from '../../../../theme/themeCommon'

const Content = styled.div`
  display: flex;
  gap: 5px;
`

const Option = styled.div`
  width: 120px;
  padding: 2px 0 2px 0;
  color: ${({ active }) => (active ? themeCommon.colorWhite : themeCommon.colorGrayBlue)};
  font-size: ${themeCommon.fontSizeSmall};
  font-weight: 400;
  font-family: 'Poppins';
  font-style: normal;
  cursor: pointer;
  text-align: center;
  ${({ active }: { active?: boolean }) =>
    active &&
    `
    border-radius: 100px;
    background: ${themeCommon.colorKey};
  `}
`

interface Props {
  options?: number[]
  name?: string
  onChange?: (o: number) => void
  active?: number
}

export const RangePicker = ({ active, options = [], name = 'days', onChange = () => {} }: Props) => {
  return (
    <Content>
      {options?.map((o) => (
        <Option key={o} active={active === o} onClick={() => onChange(o)}>
          {'Last ' + o + ' days'}
        </Option>
      ))}
    </Content>
  )
}
