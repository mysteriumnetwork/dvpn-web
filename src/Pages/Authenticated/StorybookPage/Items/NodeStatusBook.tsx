/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CenteredColumn } from '../Components'
import { Indicator, IndicatorVariants, resolveContent } from '../../Components/NodeStatus/NodeStatus'

const VARIANTS: IndicatorVariants[] = ['online', 'offline', 'monitoringFailed']

const NodeStatusBook = () => {
  return (
    <CenteredColumn>
      {VARIANTS.map((v) => (
        <Indicator key={v} $variant={v}>
          {resolveContent(v)}
        </Indicator>
      ))}
    </CenteredColumn>
  )
}

export default NodeStatusBook
