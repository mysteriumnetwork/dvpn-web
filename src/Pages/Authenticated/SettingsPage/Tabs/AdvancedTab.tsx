/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LayoutUnstyledRow } from '../../Components/Layout/Layout'
import { AdvancedSettings } from './Advanced/AdvancedSettings'

const AdvancedTab = () => {
  return (
    <LayoutUnstyledRow>
      <AdvancedSettings />
    </LayoutUnstyledRow>
  )
}

export default AdvancedTab
