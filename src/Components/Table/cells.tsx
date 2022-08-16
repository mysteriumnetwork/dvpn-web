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
const MobileCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 5px;
`
const CardHeaderPrimary = styled.div`
  color: ${({ theme }) => theme.table.mobileCard.textColorPrimary};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
`
const CardHeaderSecondary = styled.div`
  color: ${({ theme }) => theme.table.mobileCard.textColorSecondary};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
`
const CellHeader = styled.div`
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.table.mobileCard.textColorSecondary};
`
const CellData = styled.div`
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  color: ${({ theme }) => theme.table.mobileCard.textColorPrimary};
  font-weight: 500;
`
export const cells = {
  PrimaryCell,
  SecondaryCell,
  MobileCell,
  CellHeader,
  CellData,
  CardHeaderPrimary,
  CardHeaderSecondary,
}
