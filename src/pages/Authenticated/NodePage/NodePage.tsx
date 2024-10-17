/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react'
import NodeOverviewCard from './NodeOverviewCard'
import NodeServicesCared from './NodeServicesCard'
import { PageLayout } from '../../components/Layout/PageLayout'
import Title from '../../../components/Typography/Title'
import Label from '../../../components/Typography/Label'

const NodePage = () => {
  return (
    <PageLayout>
      <Title value="Node" />
      <Label value="Overview" className="text-pink-525 mb-4" />
      <NodeOverviewCard fluid className="mb-12 md:mb-10" />
      <Label value="Services" className="text-pink-525 mb-4" />
      <NodeServicesCared fluid />
    </PageLayout>
  )
}

export default NodePage
