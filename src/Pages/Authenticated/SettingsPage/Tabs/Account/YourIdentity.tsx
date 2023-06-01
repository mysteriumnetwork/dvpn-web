/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { InputGroup } from '../../../../../Components/Inputs/InputGroup'
import { TextField } from '../../../../../Components/Inputs/TextField'
import { SettingsCard } from '../../SettingsCard'
import { useAppSelector } from '../../../../../commons/hooks'
import { selectors } from '../../../../../redux/selectors'
import identities from '../../../../../commons/identities'
import CopyToClipboardButtonIcon from '../../../../../Components/Inputs/CopyToClipboardButtonIcon'
import { ThemeSwitch } from '../../../Components/ThemeSwitch/ThemeSwitch'

export const YourIdentity = () => {
  const { id } = useAppSelector(selectors.currentIdentity)

  return (
    <SettingsCard loading={identities.isEmpty(id)} title="User settings" dataTestId="SettingsCard.yourIdentity">
      <InputGroup
        title="Your identity"
        input={<TextField disabled value={id} tooltip icon={<CopyToClipboardButtonIcon text={id} />} />}
      />
      <InputGroup title="Theme" input={<ThemeSwitch />} />
    </SettingsCard>
  )
}
