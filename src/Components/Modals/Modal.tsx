/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { ReactNode } from 'react'
import themes from '../../commons/themes'
import { XButtonIcon } from '../Icons/ButtonIcons'

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;

  z-index: 1000;
  background: ${({ theme }) => theme.modal.bgOverlay};
`

const StyledModal = styled.div`
  position: fixed;
  z-index: 1000;

  width: 900px;
  height: 440px;

  left: 50%;
  top: 20%;
  transform: translate(-50%, 0);

  background: ${({ theme }) => theme.modal.bgColor};
  box-shadow: ${({ theme }) => theme.modal.boxShadow};
  border-radius: 20px;
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 64px;
  height: 64px;

  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  top: -32px;
`

const CloseButtonPlacement = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  right: -32px;
  top: -32px;
  border-radius: 100px;
`

const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-top: 40px;
`

const SubTitle = styled.div`
  font-size: ${themes.common.fontSizeBig};
  font-weight: 700;
  margin-top: 10px;
  color: ${themes.common.colorKey};
`

interface Props {
  show: boolean
  icon?: ReactNode
  title?: string
  subTitle?: string
  children?: ReactNode
  onClickX?: () => void
}

export const Modal = ({ show, icon, title, children, onClickX }: Props) => {
  if (!show) {
    return <></>
  }

  return (
    <>
      <Overlay />
      <StyledModal>
        <Container>
          <Icon>{icon}</Icon>
          <CloseButtonPlacement>
            <XButtonIcon onClick={onClickX} />
          </CloseButtonPlacement>
          <Title>{title}</Title>
          <SubTitle>{title}</SubTitle>
          {children}
        </Container>
      </StyledModal>
    </>
  )
}