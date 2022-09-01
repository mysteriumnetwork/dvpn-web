/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NATType } from '../../SettingsPage/Tabs/Advanced/types'
import { NATTooltip } from '../../SettingsPage/Tabs/Advanced/NATTooltip'
import { CenteredColumn } from '../Components'

const TooltipsBook = () => {
  return (
    <CenteredColumn>
      {['none', 'fullcone', 'rcone', 'prcone', 'symmetric'].map((nt) => (
        <NATTooltip key={nt} type={nt as NATType} />
      ))}
    </CenteredColumn>
  )
}

export default TooltipsBook
