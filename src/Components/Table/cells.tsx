/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'

interface Props {
  $align?: string
  $ml?: string
}

const Default = styled.div<Props>`
  width: 100%;
  text-align: ${({ $align }) => $align || 'left'};
  margin-left: ${({ $ml }) => $ml};
`
const Primary = styled(Default)`
  color: ${({ theme }) => theme.table.textColorPrimary};
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  font-weight: 600;
`
const Secondary = styled(Default)`
  color: ${({ theme }) => theme.table.textColorSecondary};
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  font-weight: 400;
`

export const Cells = {
  Default,
  Primary,
  Secondary,
}
