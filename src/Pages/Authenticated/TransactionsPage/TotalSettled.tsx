/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card } from './Card'
import styled from 'styled-components'
import { WalletIcon } from '../../../Components/Icons/Icons'
import themes from '../../../commons/themes'

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
`

const Column = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
`

const Title = styled.div`
  max-width: 8em;
  color: ${({ theme }) => theme.colorTextSecondary};
`
const Value = styled.div`
  max-width: 8em;
  font-size: ${themes.common.fontSizeHuge};
  font-weight: 700;
  color: ${({ theme }) => theme.colorTextMain};
`

export const TotalSettled = () => {
  return (
    <Card>
      <Row>
        <WalletIcon $accented />
        <Column>
          <Title>Total settled</Title>
          <Value>35.34 MYST</Value>
        </Column>
      </Row>
    </Card>
  )
}
