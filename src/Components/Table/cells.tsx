/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { css } from 'styled-components'

const cellCss = css`
  white-space: no-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  padding: 1em;
`
const PrimaryCell = styled.div`
  color: ${({ theme }) => theme.table.textColorPrimary};
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  font-weight: 600;
  ${cellCss}
`
const SecondaryCell = styled.div`
  color: ${({ theme }) => theme.table.textColorSecondary};
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  font-weight: 400;
  ${cellCss}
`

export const cells = {
  PrimaryCell,
  SecondaryCell,
}
