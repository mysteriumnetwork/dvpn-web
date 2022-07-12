/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Layout, LayoutHeroCardRow, LayoutUnstyledRow } from '../Components/Layout/Layout'
import { TransactionsHeaderIcon } from '../../../Components/Icons/PageIcons'
import { Table } from '../../../Components/Table/Table'
import { Card } from './Card'
import { DownloadTransactionCSV } from './DownloadTransactionCSV'
import { TotalSettled } from './TotalSettled'

export const TransactionsPage = () => {
  return (
    <Layout logo={<TransactionsHeaderIcon />} title="Transactions">
      <LayoutHeroCardRow>
        <TotalSettled />
        <Card grow={10}>Two</Card>
        <DownloadTransactionCSV />
      </LayoutHeroCardRow>
      <LayoutUnstyledRow>
        <Table columns={[]} data={[]} />
      </LayoutUnstyledRow>
    </Layout>
  )
}
