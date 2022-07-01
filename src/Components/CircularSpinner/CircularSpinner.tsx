/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import classnames from 'classnames'

import styles from './CircularSpinner.module.scss'

type Props = {
  className?: string
}

export const CircularSpinner = ({ className }: Props) => {
  const classes = classnames(styles.spinner, className)

  return <div className={classes}></div>
}
