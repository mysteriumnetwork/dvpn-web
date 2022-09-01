/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { themeCommon } from '../../../../theme/themeCommon'
import { HeaderItem } from '../../../../Components/Header/HeaderItem'

export type IndicatorVariants = 'online' | 'offline' | 'monitoringFailed'

interface IndicatorProps {
  $variant: IndicatorVariants
}

const Indicator = styled.div<IndicatorProps>`
  background: ${({ theme, $variant }) => theme.nodeStatus.bg[$variant]};
  color: ${({ theme, $variant }) => theme.nodeStatus.textColor[$variant]};
  font-size: ${themeCommon.fontSizeSmaller};
  font-weight: 400;
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
`

export const NodeStatus = () => {
  return <HeaderItem title="Status" content={<Indicator $variant="online">Online</Indicator>} />
}
