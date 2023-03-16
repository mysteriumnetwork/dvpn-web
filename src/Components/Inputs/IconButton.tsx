/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  icon: ReactNode
  onClick?: () => void
  onBlur?: () => void
  children?: ReactNode
}

const IButton = styled.button`
  width: 48px;
  height: 48px;
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 100px;

  :hover {
    cursor: pointer;
  }
`

export const IconButton = ({ icon, onClick, onBlur, children }: Props) => {
  return (
    <IButton onBlur={() => onBlur && onBlur()} onClick={() => onClick && onClick()}>
      {icon}
      {children}
    </IButton>
  )
}
