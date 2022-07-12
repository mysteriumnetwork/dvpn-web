/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import styled from 'styled-components'
import themes from '../../commons/themes'

interface Props {
  icon: ReactNode
  onClick?: () => void
}

const IButton = styled.div`
  width: 48px;
  height: 48px;

  border-radius: 100px;
  :active {
    background: ${themes.common.colorWhite}1A;
  }
`

export const IconButton = ({ icon, onClick }: Props) => {
  return <IButton onClick={() => onClick && onClick()}>{icon}</IButton>
}
