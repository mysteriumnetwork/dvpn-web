/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { InputGroup } from '../../../../../Components/Inputs/InputGroup'
import { TextField } from '../../../../../Components/Inputs/TextField'
import { InputCopyToClipboardIcon } from '../../../../../Components/Icons/InputIcons'
import { SettingsCard } from '../../SettingsCard'
import { useAppSelector } from '../../../../../commons/hooks'
import { selectors } from '../../../../../redux/selectors'
import identities from '../../../../../commons/identities'

export const YourIdentity = () => {
  const { id } = useAppSelector(selectors.currentIdentitySelector)

  return (
    <SettingsCard loading={identities.isEmpty(id)} title="Identity">
      <InputGroup title="Your identity" input={<TextField disabled value={id} icon={<InputCopyToClipboardIcon />} />} />
    </SettingsCard>
  )
}
