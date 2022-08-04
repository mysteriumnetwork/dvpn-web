/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface Props {
  checked: boolean
  onChange?: (b: boolean) => void
  disabled?: boolean
}

export const Checkbox = ({ onChange, disabled, checked }: Props) => {
  return (
    <input
      disabled={disabled}
      checked={checked}
      type="checkbox"
      onChange={(e) => {
        const { checked } = e.target
        onChange && onChange(checked)
      }}
    />
  )
}
