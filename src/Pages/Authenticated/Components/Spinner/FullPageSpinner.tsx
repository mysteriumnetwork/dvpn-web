/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import styles from './Spinner.module.scss'
import { CircularSpinner } from '../../../../Components/CircularSpinner/CircularSpinner'
import styled from 'styled-components'

const Overlay = styled.div`
  width: 100%;
  opacity: 0.5;
  z-index: 1000;
  height: 100%;
  background: #dfdfdf;
  position: fixed;
  top: 0;
  left: 0;
`

export const FullPageSpinner = () => {
  return (
    <>
      <Overlay />
      <CircularSpinner className={styles.spinner} />
    </>
  )
}
