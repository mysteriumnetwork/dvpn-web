/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Layout } from '../Components/Layout/Layout'
import { TransactionsHeaderIcon } from '../../../Components/Icons/Icons'

export const TransactionsPage = () => {
  return <Layout logo={<TransactionsHeaderIcon />} title="Transactions"></Layout>
}
