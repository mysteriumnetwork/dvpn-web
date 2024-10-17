/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CenteredColumn } from '../Components'
import BubbleIndicator, { BubbleIndicatorVariant } from '../../../../components/Indicators/BubbleIndicator'

const VARIANTS: BubbleIndicatorVariant[] = ['success', 'disabled', 'error', 'warning']

const NodeStatusBook = () => {
  return (
    <CenteredColumn>
      {VARIANTS.map((v) => (
        <BubbleIndicator key={v} variant={v} label={v} />
      ))}
    </CenteredColumn>
  )
}

export default NodeStatusBook
