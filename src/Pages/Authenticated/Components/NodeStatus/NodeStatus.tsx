/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { themeCommon } from '../../../../theme/themeCommon'
import { devices } from '../../../../theme/themes'
const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  @media ${devices.tablet} {
    margin-bottom: 25px;
  }
`
const Title = styled.div`
  color: ${({ theme }) => theme.text.colorMain};
  font-size: ${themeCommon.fontSizeSmall};
  font-weight: 400;
  @media ${devices.tablet} {
    color: ${themeCommon.colorWhite};
  }
`

export type IndicatorVariants = 'online' | 'offline' | 'monitoringFailed'

interface IndicatorProps {
  $variant: IndicatorVariants
}

const Indicator = styled.div<IndicatorProps>`
  background: ${({ theme, $variant }) => theme.nodeStatus.background[$variant]};
  color: ${({ theme, $variant }) => theme.nodeStatus.textColor[$variant]};
  font-size: ${themeCommon.fontSizeSmaller};
  font-weight: 400;
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
`

export const NodeStatus = () => {
  return (
    <Status>
      <Title>Status:</Title>
      <Indicator $variant="online">Online</Indicator>
    </Status>
  )
}
