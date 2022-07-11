/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { css } from 'styled-components'
import themes from '../../commons/themes'
import { CircularSpinner } from '../CircularSpinner/CircularSpinner'

export type ButtonVariant = 'primary' | 'secondary' | 'outlined'

const PRIMARY_CSS = css`
  color: ${themes.current().colorWhite};
  background: ${themes.current().colorKey};

  :active {
    background: ${themes.current().colorKey}BB;
  }
`

const SECONDARY_CSS = css`
  color: ${themes.current().colorWhite};
  background: ${themes.current().colorGrayBlue};

  :active {
    background: ${themes.current().colorGrayBlue}BB;
  }
`

const OUTLINES_CSS = css`
  color: ${themes.current().colorGrayBlue};
  background: none;
  border: 1px solid ${themes.current().colorGrayBlue};

  :active {
    background: ${themes.current().colorGrayBlue}51;
  }
`

const resolveCSS = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return PRIMARY_CSS
    case 'secondary':
      return SECONDARY_CSS
    case 'outlined':
      return OUTLINES_CSS
    default:
      return PRIMARY_CSS
  }
}

interface ButtonStyleProps {
  $variant: ButtonVariant
}

const StyledButton = styled.button<ButtonStyleProps>`
  position: relative;
  font-size: ${themes.current().fontSizeSmall};

  border: 0;
  border-radius: 5px;

  min-width: 70px;
  min-height: 26px;
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

  background: ${themes.current().colorGrayBlue};
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
  border: 6px solid ${themes.current().colorWhite};
  z-index: 1001;
`

interface Props {
  label: string
  variant?: ButtonVariant
  loading?: boolean
  onClick?: () => void
  type?: 'submit' | 'reset' | 'button'
}

export const Button = ({ loading, label, variant = 'primary', onClick, type }: Props) => {
  return (
    <StyledButton $variant={variant} type={type} disabled={loading} onClick={onClick}>
      {loading && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}
      {label}
    </StyledButton>
  )
}
