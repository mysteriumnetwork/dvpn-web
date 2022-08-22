/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LayoutRow } from '../../Components/Layout/Layout'
import { NodeStatus } from './Traffic/NodeStatus'
import { BandwidthControl } from './Traffic/BandwidthControl'

const TrafficTab = () => {
  return (
    <>
      <LayoutRow>
        <NodeStatus />
        <BandwidthControl />
      </LayoutRow>
    </>
  )
}

export default TrafficTab
