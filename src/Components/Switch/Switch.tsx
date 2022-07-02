/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import RSwitch from 'react-switch'

interface Props {
  checked: boolean
  onChange: (value: boolean) => void
  className?: string
}

export const Switch = ({ checked, onChange, className }: Props) => {
  return (
    <RSwitch
      className={className}
      checked={checked}
      onChange={onChange}
      uncheckedIcon={false}
      checkedIcon={false}
      onColor="#63B64E"
      offColor="#9090BB"
    />
  )
}
