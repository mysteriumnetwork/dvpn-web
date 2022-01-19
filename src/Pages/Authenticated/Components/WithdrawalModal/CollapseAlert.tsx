/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Alert, AlertTitle, Color } from '@material-ui/lab'
import Collapse from '@material-ui/core/Collapse'
import React from 'react'

interface Props {
  visible?: boolean
  severity?: Color
  title?: string
  children?: JSX.Element | JSX.Element[] | string
}

export const CollapseAlert = ({ visible, severity, children, title }: Props) => {
  return (
    <Collapse in={visible}>
      <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {children}
      </Alert>
    </Collapse>
  )
}
