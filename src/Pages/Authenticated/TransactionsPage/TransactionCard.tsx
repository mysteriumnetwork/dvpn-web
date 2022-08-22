/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Settlement } from 'mysterium-vpn-js'
import dates from '../../../commons/dates'
import styled from 'styled-components'
import { themeCommon, alphaToHex } from '../../../theme/themeCommon'
import { myst } from '../../../commons/mysts'
import { ReactComponent as Download } from '../../../assets/images/download.svg'

const { date2human } = dates

const Body = styled.div`
  background-color: ${({ theme }) => theme.table.bgBody} !important;
  border-radius: 30px;
  padding: 30px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 10px;
`
const Header = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 5px;
  width: 100%;
  border-bottom: 1px dashed ${themeCommon.colorGrayBlue2 + alphaToHex(0.5)};
`
const Row = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
`
const DataColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  gap: 5px;
  :nth-of-type(even) {
    align-items: flex-end;
  }
`
const HeaderRow = styled(Row)`
  margin-top: 0;
  margin-bottom: 10px;
`
const DataHeader = styled.div`
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.table.mobileCard.textColorSecondary};
`
const Data = styled.div`
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  color: ${({ theme }) => theme.table.mobileCard.textColorPrimary};
  font-weight: 500;
`
const Date = styled(Data)`
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.table.mobileCard.textColorSecondary};
`
const Hash = styled(Data)`
  width: 100%;
  overflow: hidden;
  white-space: no-wrap;
  text-overflow: ellipsis;
`
const AmountDataHeader = styled(DataHeader)`
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-start;
`
const WalletColumn = styled(DataColumn)`
  width: 100%;
`
interface Props {
  item: Settlement
}
export const TransactionCard = ({ item }: Props) => {
  return (
    <Body>
      <Header>
        <HeaderRow>
          <DataHeader>Transaction ID</DataHeader>
          <Date>{date2human(item.settledAt)}</Date>
        </HeaderRow>
        <Hash>{item.txHash}</Hash>
      </Header>
      <Row>
        <WalletColumn>
          <DataHeader>External Wallet Address</DataHeader>
          <Hash>{item.beneficiary}</Hash>
        </WalletColumn>
      </Row>
      <Row>
        <DataColumn>
          <AmountDataHeader>
            Received amount <Download />
          </AmountDataHeader>
          <Data>{myst.display(item.amount, { fractionDigits: 3 })}</Data>
        </DataColumn>
        <DataColumn>
          <DataHeader>Fees</DataHeader>
          <Data>{myst.display(item.fees, { fractionDigits: 3 })}</Data>
        </DataColumn>
      </Row>
    </Body>
  )
}
