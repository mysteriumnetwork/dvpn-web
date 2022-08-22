/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LayoutRow } from '../../Components/Layout/Layout'
import { NATType } from '../../SettingsPage/Tabs/Advanced/types'
import { NATTooltip } from '../../SettingsPage/Tabs/Advanced/NATTooltip'

const TooltipsBook = () => {
  return (
    <LayoutRow>
      {['none', 'fullcone', 'rcone', 'prcone', 'symmetric'].map((nt) => (
        <NATTooltip key={nt} type={nt as NATType} />
      ))}
    </LayoutRow>
  )
}

export default TooltipsBook
