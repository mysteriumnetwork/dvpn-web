/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { devices } from '../../../theme/themes'
import { ReactComponent as Wallet } from '../../../assets/images/transactions.svg'

const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  width: 100%;
  @media ${devices.tablet} {
    height: 100%;
  }
`
const PlaceholderIcon = styled(Wallet)`
  width: 350px;
  @media ${devices.tablet} {
    width: 300px;
  }
`
const PlaceholderText = styled.div`
  color: ${({ theme }) => theme.common.colorGrayBlue};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  font-weight: 700;
  margin-top: 25px;
  @media ${devices.tablet} {
    margin: 50px 0;
  }
`
export const Placeholder = () => (
  <PlaceholderContainer>
    <PlaceholderIcon />
    <PlaceholderText>No transactions in your history yet</PlaceholderText>
  </PlaceholderContainer>
)
