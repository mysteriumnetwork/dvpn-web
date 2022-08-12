/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card } from './Card'
import styled from 'styled-components'
import { WalletIcon } from '../../../Components/Icons/Icons'
import { useAppSelector } from '../../../commons/hooks'
import { selectors } from '../../../redux/selectors'
import { myst } from '../../../commons/mysts'
import { themeCommon } from '../../../theme/themeCommon'
import { feez } from '../../../commons/fees'

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
  font-size: ${themeCommon.fontSizeHuge};
  font-weight: 700;
  color: ${({ theme }) => theme.text.colorMain};
`
const { calculateSettled } = feez
export const TotalSettled = () => {
  const identity = useAppSelector(selectors.currentIdentity)
  const totalSettled = calculateSettled(identity.earningsTokens, identity.earningsTotalTokens)
  return (
    <Card grow={0} fluid={false}>
      <Row>
        <WalletIcon $accented />
        <Column>
          <Title>Total settled</Title>
          <Value>{myst.display(totalSettled, { fractionDigits: 2 })}</Value>
        </Column>
      </Row>
    </Card>
  )
}
