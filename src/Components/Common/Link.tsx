/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'

export const Link = styled.a`
  color: ${({ theme }) => theme.a.textColor};
  font-weight: 500;
  text-decoration: none;
`
