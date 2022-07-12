/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { css } from 'styled-components'
import themes from '../../commons/themes'
import { CircularSpinner } from '../CircularSpinner/CircularSpinner'
import { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'blue'

const PRIMARY_CSS = css`
  color: ${themes.common.colorWhite};
  background: ${themes.common.colorKey};

  :active {
    background: ${themes.common.colorKey}BB;
  }
`

const SECONDARY_CSS = css`
  color: ${themes.common.colorWhite};
  background: ${themes.common.colorGrayBlue};

  :active {
    background: ${themes.common.colorGrayBlue}BB;
  }
`

const OUTLINES_CSS = css`
  color: ${themes.common.colorGrayBlue};
  background: none;
  border: 1px solid ${themes.common.colorGrayBlue};

  :active {
    background: ${themes.common.colorGrayBlue}51;
  }
`

const BLUE_CSS = css`
  color: ${themes.common.colorWhite};
  background: ${themes.common.colorBlue};

  :active {
    background: ${themes.common.colorBlue}BB;
`

const resolveCSS = (variant: ButtonVariant) => {
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

interface ButtonStyleProps {
  $variant: ButtonVariant
  $rounded?: boolean
}

const StyledButton = styled.button<ButtonStyleProps>`
  position: relative;
  font-size: ${themes.common.fontSizeSmall};

  border: 0;
  border-radius: ${({ $rounded }) => ($rounded ? '100px' : '5px')};

  min-width: 70px;
  min-height: 32px;
  max-height: 32px;
  padding: 8px 12px 8px 12px;

  :hover {
    cursor: pointer;
  }

  ${({ $variant }) => resolveCSS($variant)}
`

const LoadingOverlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${themes.common.colorGrayBlue};
  border-radius: 5px;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  z-index: 1000;
`

const Spinner = styled(CircularSpinner)`
  width: 8px;
  height: 8px;
  border: 6px solid ${themes.common.colorWhite};
  z-index: 1001;
`

interface Props {
  label: ReactNode
  variant?: ButtonVariant
  loading?: boolean
  rounded?: boolean
  onClick?: () => void
  type?: 'submit' | 'reset' | 'button'
}

export const Button = ({ loading, label, variant = 'primary', onClick, type, rounded }: Props) => {
  return (
    <StyledButton $rounded={rounded} $variant={variant} type={type} disabled={loading} onClick={onClick}>
      {loading && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}
      {label}
    </StyledButton>
  )
}
