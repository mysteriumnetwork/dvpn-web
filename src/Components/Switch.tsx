/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { FormControlLabel, Switch as MUISWitch } from '@material-ui/core'

interface Props {
  disabled: boolean
  turnedOn: boolean
  handleChange: (event: React.ChangeEvent<any>, checked: boolean) => void
}

export const Switch = ({ disabled, turnedOn, handleChange }: Props): JSX.Element => {
  const type = 'normal'

  return (
    <FormControlLabel
      disabled={disabled}
      control={<MUISWitch checked={turnedOn} onChange={handleChange} className={'default-switch ' + type} />}
      label={''}
    />
  )
}
