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
  className?: string
  variant?: 'green' | 'key'
  size?: 'normal' | 'small'
}

export const Switch = ({ checked, onChange, className, disabled, variant = 'green', size = 'normal' }: Props) => {
  return (
    <RSwitch
      className={className}
      checked={checked}
      onChange={onChange}
      uncheckedIcon={false}
      checkedIcon={false}
      onColor={variant === 'green' ? themes.current().colorGreen : themes.current().colorKey}
      offColor={themes.current().colorGrayBlue}
      disabled={disabled}
    />
  )
}
