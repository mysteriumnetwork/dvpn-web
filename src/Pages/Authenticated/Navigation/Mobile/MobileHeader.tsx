/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { alphaToHex, themeCommon } from '../../../../theme/themeCommon'
import styled from 'styled-components'
import { Quality } from '../../Components/Quality/Quality'
import { NodeStatus } from '../../Components/NodeStatus/NodeStatus'
import { NATStatus } from '../../Components/NATStatus/NATStatus'
import { SettlementStatus } from '../../Components/SettlementStatus/SettlementStatus'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 144px;
  width: 90%;
  min-width: 300px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.bgSettlementMobile};
  box-shadow: 0 5px 20px ${themeCommon.yankeeBlue + alphaToHex(0.15)};
  justify-items: center;
  align-items: center;

  > :first-child,
  > :nth-child(2) {
    border-bottom: 1px solid ${({ theme }) => theme.common.colorGray};
  }

  > :nth-child(3),
  > :first-child {
    border-right: 1px solid ${({ theme }) => theme.common.colorGray};
  }
  > * {
    width: 100%;
    height: 100%;
  }
`

const Cell = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const MobileHeader = () => {
  return (
    <Grid>
      <Cell>
        <NodeStatus />
      </Cell>
      <Cell>
        <NATStatus />
      </Cell>
      <Cell>
        <Quality />
      </Cell>
      <Cell>{<SettlementStatus />}</Cell>
    </Grid>
  )
}
