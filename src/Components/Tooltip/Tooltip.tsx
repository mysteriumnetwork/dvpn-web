/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Tooltip as MUIToolTip } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import React from 'react'
import { Media } from '../../commons/media.utils'

interface Props {
  title: NonNullable<React.ReactNode>
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top'
  icon?: JSX.Element
}

const Tooltip = ({ title, icon, placement = 'bottom' }: Props) => {
  return (
    <Media.Desktop>
      <MUIToolTip
        title={title}
        style={{ backgroundColor: '#FFFFFF !important', fill: '#9D9D9D' }}
        placement={placement}
        arrow
        interactive
      >
        {icon ? icon : <HelpIcon fontSize="small" />}
      </MUIToolTip>
    </Media.Desktop>
  )
}

export default Tooltip
