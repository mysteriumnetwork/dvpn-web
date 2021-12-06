/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

interface Props {
  label?: string
  help?: string
  children?: any
}

export const InputGroup = ({ label, help, children }: Props) => {
  return (
    <div className="input-group">
      <p className="input-group__label">{label}</p>
      {children}
      {help && <p className="input-group__help">{help}</p>}
    </div>
  )
}
