/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled, { css } from 'styled-components'
import { useMemo } from 'react'
import { themeCommon, alphaToHex } from '../../../theme/themeCommon'

interface BubbleProps {
  $primary?: boolean
  value?: string
  $line?: boolean
}
const greenAfterCss = css<BubbleProps>`
  :after {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    left: 0px;
    border-bottom: 3px solid transparent;
    border-top: 3px solid transparent;
    border-right: 5px solid
      ${({ $primary }) => ($primary ? themeCommon.colorGreen : `${themeCommon.colorGreen}${alphaToHex(0.1)}`)};
    transform: translateX(-4px) translateY(-1px);
  }
`
const commonBubbleCss = css`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  border-radius: 12px;
  padding: 5px 10px 5px 10px;
  font-weight: 700;
  font-size: ${themeCommon.fontSizeSmall};
  &:before {
    content: attr(value);
    position: relative;
  }
`

const BlueBubble = styled.div<BubbleProps>`
  ${commonBubbleCss};
  background: ${({ $primary }) => ($primary ? themeCommon.colorBlue : `${themeCommon.colorBlue}${alphaToHex(0.2)}`)};
  color: ${({ $primary }) => ($primary ? themeCommon.colorWhite : themeCommon.colorDarkBlue)};
  :after {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    left: 0px;
    border-bottom: 3px solid transparent;
    border-top: 3px solid transparent;
    border-right: 5px solid
      ${({ $primary }) => ($primary ? themeCommon.colorBlue : `${themeCommon.colorBlue}${alphaToHex(0.2)}`)};
    transform: translateX(-4px) translateY(-1px);
  }
`

const GreenBubble = styled.div<BubbleProps>`
  ${commonBubbleCss};
  background: ${({ $primary }) => ($primary ? themeCommon.colorGreen : `${themeCommon.colorGreen}${alphaToHex(0.1)}`)};
  color: ${({ $primary }) => ($primary ? themeCommon.colorWhite : themeCommon.colorDarkBlue)};
  /* Leaving this for when we do the line if we need to */
  ${({ $line }) => !$line && greenAfterCss}
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
  line?: boolean
  color?: 'blue' | 'green' | 'no-background'
}

export const Bubble = ({ line, value, primary = false, color = 'blue' }: Props) => {
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
      <BubbleComponent $line={line} $primary={primary} value={value} />
    </Content>
  )
}
