/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import EarningsCard from './EarningsCard'
import Title from '../../../components/Typography/Title'
import Label from '../../../components/Typography/Label'
import { PageLayout } from '../../components/Layout/PageLayout'

const EarningsPage = () => {
  return (
    <PageLayout>
      <Title value="Earnings" />
      <Label value="Earnings" className="text-pink-525 mb-4" />
      <EarningsCard fluid />
    </PageLayout>
  )
}

export default EarningsPage
