/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import { Variant } from './types'
import { ReactComponent as IndicatorSVG } from '../../../../../assets/images/indicator.svg'

interface SProps {
  $size: string
  $variant: Variant
}

const IndicatorIcon = styled(IndicatorSVG)<SProps>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  #outer {
    fill: ${({ theme, $variant }) => theme.indicator[$variant].color};
  }

  #inner {
    fill: ${({ theme }) => theme.indicator.holeBg};
  }
`

interface Props {
  size?: number
  variant?: Variant
}

export const CircleIndicator = ({ size = 24, variant = 'error' }: Props) => {
  return <IndicatorIcon $size={`${size}px`} $variant={variant} />
}
