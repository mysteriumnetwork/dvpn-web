/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react'
import { FormControlLabel, Switch } from '@material-ui/core'

interface Props {
  disabled: boolean;
  turnedOn: boolean;
  handleChange: (event: React.ChangeEvent<any>, checked: boolean) => void
}

export const DefaultSwitch: FC<Props> = ({ disabled, turnedOn, handleChange }) => {
  const type = 'normal'

  return (
    <FormControlLabel disabled={disabled} control={
      <Switch checked={turnedOn} onChange={handleChange} className={'default-switch ' + type}/>
    } label={""}/>
  )
}
