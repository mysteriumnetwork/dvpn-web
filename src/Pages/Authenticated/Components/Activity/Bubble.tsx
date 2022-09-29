/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'

const Stat = styled.div<{ $bgColor: string; $primary?: boolean }>`
  position: relative;
  width: 54px;
  height: 30px;
  background-color: ${({ $bgColor }) => $bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  color: ${({ theme, $primary }) => ($primary ? theme.common.colorWhite : theme.activity.bubble.fontColor)};
  font-weight: 700;

  :before {
    content: '';
    border: 4px solid ${({ $bgColor }) => $bgColor};
    //border: 4px solid black;
    transform: translateX(-3px) rotate(45deg);
    position: absolute;
    left: 0;
  }
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
`

const Label = styled.div<{ $primary?: boolean }>`
  font-weight: ${({ $primary }) => ($primary ? 700 : 400)};
`

interface Props {
  value: string | number
  bgColor: string
  primary?: boolean
  label: string
}

export const Bubble = ({ value, bgColor, primary, label }: Props) => {
  return (
    <Content>
      <Stat $primary={primary} $bgColor={bgColor}>
        {value}
      </Stat>
      <Label $primary={primary}>{label}</Label>
    </Content>
  )
}
