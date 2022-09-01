/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { CircularSpinner } from '../../../../Components/CircularSpinner/CircularSpinner'
import styled from 'styled-components'
import zIndexes from '../../../../constants/z-indexes'

const Overlay = styled.div`
  width: 100%;
  opacity: 0.5;
  z-index: ${zIndexes.overlay};
  height: 100%;
  background: #dfdfdf;
  position: fixed;
  top: 0;
  left: 0;
`

const Spinner = styled(CircularSpinner)`
  width: 6em;
  height: 6em;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 1001;
  position: fixed;
`

export const FullPageSpinner = () => {
  return (
    <>
      <Overlay />
      <Spinner />
    </>
  )
}
