/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CircularProgress } from '@material-ui/core'
import React from 'react'
import styles from './Spinner.module.scss'

export const Spinner = () => {
  return (
    <>
      <div className={styles.overlay} />
      <CircularProgress size={150} thickness={1} className={styles.spinner} disableShrink />
    </>
  )
}
