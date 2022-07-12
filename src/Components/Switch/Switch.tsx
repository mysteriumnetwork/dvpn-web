/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import RSwitch from 'react-switch'
import themes from '../../commons/themes'

interface Props {
  checked: boolean
  disabled?: boolean
  onChange: (value: boolean) => void
  variant?: 'green' | 'key'
  size?: 'normal' | 'small'
}

export const Switch = ({ checked, onChange, disabled, variant = 'green', size = 'normal' }: Props) => {
  return (
    <RSwitch
      checked={checked}
      onChange={onChange}
      uncheckedIcon={false}
      checkedIcon={false}
      onColor={variant === 'green' ? themes.common.colorGreen : themes.common.colorKey}
      offColor={themes.common.colorGrayBlue}
      disabled={disabled}
      handleDiameter={size === 'small' ? 14 : undefined}
      height={size === 'small' ? 20 : undefined}
      width={size === 'small' ? 40 : undefined}
    />
  )
}
