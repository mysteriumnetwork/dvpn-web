/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import styles from './Spinner.module.scss'
import { CircularSpinner } from '../../../../Components/CircularSpinner/CircularSpinner'

export const FullPageSpinner = () => {
  return (
    <>
      <div className={styles.overlay} />
      <CircularSpinner className={styles.spinner} />
    </>
  )
}
