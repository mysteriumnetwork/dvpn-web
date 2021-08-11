/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Checkbox as MUICheckbox } from '@material-ui/core'
import { SwitchBaseProps } from '@material-ui/core/internal/SwitchBase'

import { UncheckedIcon } from './CustomIcons'

interface Props {
  checked: boolean
  handleCheckboxChange: SwitchBaseProps['onChange']
  label?: string
}

export const Checkbox = ({ checked, handleCheckboxChange, label }: Props): JSX.Element => {
  return (
    <div className="checkbox-block">
      <MUICheckbox
        id={'checkbox-' + label}
        checked={checked}
        onChange={handleCheckboxChange}
        color="primary"
        className="default-checkbox"
        icon={<UncheckedIcon />}
      />
      <label htmlFor={'checkbox-' + label}>{label}</label>
    </div>
  )
}
