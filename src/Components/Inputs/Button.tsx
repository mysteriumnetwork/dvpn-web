/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { css } from 'styled-components'
import { CircularSpinner } from '../CircularSpinner/CircularSpinner'
import { ReactNode } from 'react'
import { themeCommon } from '../../theme/themeCommon'

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'blue'
export type ButtonSize = 'small' | 'medium' | 'large'

const PRIMARY_CSS = css`
  color: ${themeCommon.colorWhite};
  background: ${themeCommon.colorKey};

  :active {
    background: ${themeCommon.colorKey}BB;
  }
`
const MEDIUM_CSS = css`
  padding: 16px 50px 16px 50px;
`
const LARGE_CSS = css`
  padding: 25px 50px;
  font-size: ${({ theme }) => theme.common.fontSizeBigger};
`
const SECONDARY_CSS = css`
  color: ${themeCommon.colorWhite};
  background: ${themeCommon.colorGrayBlue};

  :active {
    background: ${themeCommon.colorGrayBlue}BB;
  }
`

const OUTLINES_CSS = css`
  color: ${themeCommon.colorGrayBlue};
  background: none;
  border: 1px solid ${themeCommon.colorGrayBlue};

  :active {
    background: ${themeCommon.colorGrayBlue}51;
  }

  :hover {
    background-color: ${({ theme }) => theme.buttons.outlined.hoverBackgroundColor};
  }
`
const BLUE_CSS = css`
  color: ${themeCommon.colorWhite};
  background: ${themeCommon.colorBlue};

  :active {
    background: ${themeCommon.colorBlue}BB;
  }
`

const resolveVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return PRIMARY_CSS
    case 'secondary':
      return SECONDARY_CSS
    case 'outlined':
      return OUTLINES_CSS
    case 'blue':
      return BLUE_CSS
    default:
      return PRIMARY_CSS
  }
}
const resolveSize = (size: ButtonSize) => {
  switch (size) {
    case 'medium':
      return MEDIUM_CSS
    case 'large':
      return LARGE_CSS
  }
}
interface ButtonStyleProps {
  $variant: ButtonVariant
  $size: ButtonSize
  $rounded?: boolean
  loading?: boolean
}

const StyledButton = styled.button<ButtonStyleProps>`
  position: relative;
  font-size: ${themeCommon.fontSizeSmall};

  border: 0;
  border-radius: ${({ $rounded }) => ($rounded ? '100px' : '5px')};
  white-space: nowrap;
  min-width: 70px;
  min-height: 32px;
  max-height: 32px;
  padding: 8px 18px 8px 18px;

  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
  }
  ${({ $size }) => resolveSize($size)}
  ${({ $variant }) => resolveVariant($variant)}
  :disabled {
    opacity: ${({ theme }) => theme.buttons.disabledOpacity};
    cursor: not-allowed;
  }
`

const LoadingOverlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${themeCommon.colorGrayBlue};
  border-radius: 5px;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  z-index: 10;
`

const Spinner = styled(CircularSpinner)`
  width: 8px;
  height: 8px;
  border: 6px solid ${themeCommon.colorWhite};
  z-index: 11;
`

interface Props {
  disabled?: boolean
  label: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  rounded?: boolean
  onClick?: () => void
  type?: 'submit' | 'reset' | 'button'
}

export const Button = ({
  size = 'small',
  disabled,
  loading,
  label,
  variant = 'primary',
  onClick,
  type,
  rounded,
}: Props) => {
  return (
    <StyledButton $size={size} $rounded={rounded} $variant={variant} type={type} disabled={disabled} onClick={onClick}>
      {loading && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}
      {label}
    </StyledButton>
  )
}
