/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { css } from 'styled-components'
import { CircularSpinner } from '../CircularSpinner/CircularSpinner'
import { alphaToHex, themeCommon } from '../../theme/themeCommon'
import { ButtonProps } from './types'
import zIndexes from '../../constants/z-indexes'

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'blue'
export type ButtonSize = 'small' | 'medium' | 'large'

const PRIMARY_CSS = css`
  color: ${themeCommon.colorWhite};
  background: ${themeCommon.colorKey};
  :active {
    background: ${themeCommon.colorKeyDark};
  }
  :hover:not(:active) {
    background: ${themeCommon.colorKeyLight};
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
    background: ${themeCommon.colorGrayBlue2};
  }
  :hover:not(:active) {
    background: ${themeCommon.colorGrayBlue2}80;
  }
`

const OUTLINES_CSS = css`
  color: ${themeCommon.colorGrayBlue};
  background: none;
  border: 1px solid ${themeCommon.colorGrayBlue};

  :active {
    background: ${themeCommon.colorGrayBlue}51;
  }

  :hover:not(:active) {
    background-color: ${({ theme }) => theme.buttons.outlined.bgHover};
  }
`
const BLUE_CSS = css`
  color: ${themeCommon.colorWhite};
  background: ${themeCommon.colorBlue};

  :active {
    background: ${themeCommon.colorDarkBlue2};
  }
  :hover:not(:active) {
    background: ${themeCommon.colorLightBlue1};
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
    default:
      return
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

const LoadingOverlay = styled.div<ButtonStyleProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${themeCommon.colorGrayBlue + alphaToHex(0.3)};

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  z-index: ${zIndexes.buttonOverlay};
  border-radius: ${({ $rounded }) => ($rounded ? '100px' : '5px')};
`

const Spinner = styled(CircularSpinner)`
  width: 24px;
  height: 24px;
  border-color: ${themeCommon.colorWhite};
  z-index: ${zIndexes.buttonSpinner};
  border-width: 2px;

  :before {
    border-top-color: ${themeCommon.colorDarkBlue};
    border-width: 2px;
    left: -2px;
    top: -2px;
  }
`

export const Button = ({
  size = 'small',
  className,
  disabled,
  loading,
  label,
  variant = 'primary',
  onClick,
  type,
  rounded,
  dataTestId,
}: ButtonProps) => {
  return (
    <StyledButton
      $size={size}
      className={className}
      $rounded={rounded}
      $variant={variant}
      type={type}
      disabled={disabled}
      onClick={onClick}
      data-test-id={dataTestId}
    >
      {loading && (
        <LoadingOverlay $size={size} $rounded={rounded} $variant={variant}>
          <Spinner />
        </LoadingOverlay>
      )}
      {label}
    </StyledButton>
  )
}
