/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LayoutUnstyledRow } from '../../Components/Layout/Layout'
import { NodeStatus } from './Traffic/NodeStatus'

const TrafficTab = () => {
  return (
    <>
      <LayoutUnstyledRow>
        <NodeStatus />
      </LayoutUnstyledRow>
    </>
  )
}

export default TrafficTab
