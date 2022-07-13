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
import { useAppSelector } from '../../../commons/hooks'
import { selectors } from '../../../redux/selectors'
import { myst } from '../../../commons/mysts'

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
  color: ${({ theme }) => theme.text.colorSecondary};
`
const Value = styled.div`
  max-width: 8em;
  font-size: ${themes.common.fontSizeHuge};
  font-weight: 700;
  color: ${({ theme }) => theme.text.colorMain};
`

export const TotalSettled = () => {
  const identity = useAppSelector(selectors.currentIdentitySelector)

  return (
    <Card>
      <Row>
        <WalletIcon $accented />
        <Column>
          <Title>Total settled</Title>
          <Value>{myst.display(identity.earningsTotalTokens.wei, { fractionDigits: 2 })}</Value>
        </Column>
      </Row>
    </Card>
  )
}
