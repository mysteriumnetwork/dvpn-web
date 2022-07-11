/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled, { css } from 'styled-components'
import themes, { alphaToHex } from '../../../commons/themes'
import { useMemo } from 'react'

interface BubbleProps {
  $primary?: boolean
}

const commonBubbleCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding: 5px;
  font-weight: 700;
  font-size: ${themes.common.fontSizeSmall};
`

const BlueBubble = styled.div<BubbleProps>`
  ${commonBubbleCss};
  background: ${({ $primary }) =>
    $primary ? themes.common.colorBlue : `${themes.common.colorBlue}${alphaToHex(0.2)}`};
  color: ${({ $primary }) => ($primary ? themes.common.colorWhite : themes.common.colorDarkBlue)};
`

const GreenBubble = styled.div<BubbleProps>`
  ${commonBubbleCss};
  background: ${({ $primary }) =>
    $primary ? themes.common.colorGreen : `${themes.common.colorGreen}${alphaToHex(0.1)}`};
  color: ${({ $primary }) => ($primary ? themes.common.colorWhite : themes.common.colorDarkBlue)};
`

const NoBackgroundBubble = styled.div<BubbleProps>`
  ${commonBubbleCss};
  font-weight: 400 !important;
`

const Content = styled.div`
  //display: flex;
`

interface Props {
  value: string
  primary?: boolean
  color?: 'blue' | 'green' | 'no-background'
}

export const Bubble = ({ value, primary = false, color = 'blue' }: Props) => {
  const BubbleComponent = useMemo(() => {
    if (color === 'green') {
      return GreenBubble
    } else if (color === 'no-background') {
      return NoBackgroundBubble
    }

    return BlueBubble
  }, [color, primary, value])

  return (
    <Content>
      <BubbleComponent $primary={primary}>{value}</BubbleComponent>
    </Content>
  )
}
