/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { alphaToHex } from '../../../../theme/themeCommon'

interface Props {
  $primary?: boolean
  title?: string
  amount?: string
}

const Container = styled.div<Props>`
  background-color: ${({ $primary, theme }) =>
    $primary ? theme.common.colorKeyLight + alphaToHex(0.05) : theme.common.colorGrayBlue + alphaToHex(0.05)};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  width: 20%;
  align-items: flex-start;
  padding: 15px;
`

const Title = styled.div<Props>`
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ $primary, theme }) => ($primary ? theme.common.colorKeyLight : theme.settleModal.card.titleColor)};
  margin-bottom: 5px;
`

const Amount = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
  width: 100%;
  gap: 20px;
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  color: ${({ $primary, theme }) => ($primary ? theme.common.colorKey : theme.settleModal.card.amountColor)};
`

export const Card = ({ $primary, title, amount }: Props) => {
  return (
    <Container $primary={$primary}>
      <Title $primary={$primary}>{title}</Title>
      <Amount $primary={$primary}>{amount}</Amount>
    </Container>
  )
}
