/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { css } from 'styled-components'
import { ReactNode } from 'react'
import { XButtonIcon } from '../Icons/ButtonIcons'
import { CircularSpinner } from '../CircularSpinner/CircularSpinner'
import { alphaToHex, themeCommon } from '../../theme/themeCommon'
import { devices } from '../../theme/themes'
import zIndexes from '../../constants/z-indexes'

type ModalSize = 'xl'

const PageOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;

  z-index: ${zIndexes.overlay};
  background: ${({ theme }) => theme.modal.bgOverlay};
  @media ${devices.tablet} {
    z-index: ${zIndexes.settleModal};
  }
`

const normalSize = css`
  width: 900px;
  height: 440px;
  @media ${devices.tablet} {
    width: 100%;
    height: 100%;
    top: 0;
  }
`

const xlSize = css`
  width: 90%;
  min-width: 50%;
  @media ${devices.tablet} {
    width: 100%;
    height: 100%;
    top: 0;
    min-height: fit-content;
  }
`

const StyledModal = styled.div<{ $size?: ModalSize; $zIndex?: number }>`
  z-index: ${({ $zIndex }) => $zIndex ?? zIndexes.modal};

  ${({ $size }) => ($size ? xlSize : normalSize)}

  background: ${({ theme }) => theme.modal.bgColor};
  box-shadow: ${({ theme }) => theme.modal.boxShadow};
  border-radius: 20px;
  @media ${devices.tablet} {
    border-radius: 0;
    background: ${({ theme }) => theme.modal.bgColor + alphaToHex(0.95)};
  }
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
  @media ${devices.tablet} {
    position: static;
    transform: translate(0, 0);
    margin-top: 32px;
  }
`

const CloseButtonPlacement = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  right: -32px;
  top: -32px;
  border-radius: 100px;
  @media ${devices.tablet} {
    top: 10px;
    right: 10px;
  }
`

const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.modal.titleColor};
  margin-top: 40px;
  @media ${devices.tablet} {
    text-align: center;
    font-size: ${({ theme }) => theme.common.fontSizeHuge};
  }
`

const SubTitle = styled.div`
  font-size: ${themeCommon.fontSizeBig};
  font-weight: 700;
  margin-top: 10px;
  color: ${themeCommon.colorKey};
  @media ${devices.tablet} {
    margin-bottom: 20px;
  }
`

const SpinnerOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: ${zIndexes.overlay};
  width: 100%;
  height: 100%;
  background: ${themeCommon.colorDarkBlue}6A;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Spinner = styled(CircularSpinner)`
  width: 50px;
  height: 50px;
  border: 6px solid ${themeCommon.colorWhite};
  z-index: ${zIndexes.spinner};
`

interface Props {
  show?: boolean
  icon?: ReactNode
  title?: string
  subTitle?: string
  children?: ReactNode
  onClickX?: () => void
  loading?: boolean
  disableBackdrop?: boolean
  disableX?: boolean
  size?: ModalSize
  zIndex?: number
}

export const Modal = ({
  show,
  icon,
  title,
  subTitle,
  children,
  onClickX,
  loading,
  disableBackdrop,
  disableX,
  size,
  zIndex,
}: Props) => {
  if (!show) {
    return <></>
  }

  return (
    <>
      <PageOverlay onClick={() => !disableBackdrop && onClickX && onClickX()}>
        <StyledModal $size={size} $zIndex={zIndex}>
          <Container>
            {loading && (
              <SpinnerOverlay>
                <Spinner />
              </SpinnerOverlay>
            )}
            {icon && <Icon>{icon}</Icon>}
            <CloseButtonPlacement>{!disableX && <XButtonIcon onClick={onClickX} />}</CloseButtonPlacement>
            {title && <Title>{title}</Title>}
            {subTitle && <SubTitle>{subTitle}</SubTitle>}
            {children}
          </Container>
        </StyledModal>
      </PageOverlay>
    </>
  )
}
