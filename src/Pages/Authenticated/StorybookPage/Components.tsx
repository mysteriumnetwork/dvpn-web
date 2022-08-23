/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { LayoutRow } from '../Components/Layout/Layout'

export const CenteredRow = styled(LayoutRow)`
  flex-direction: column;
  overflow-y: scroll;
  scroll-behavior: smooth;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.common.colorKey};
  border-radius: 10px;
  width: 100%;
`
