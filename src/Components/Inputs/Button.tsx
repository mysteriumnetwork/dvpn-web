/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import themes from '../../commons/themes'
import { CircularSpinner } from '../CircularSpinner/CircularSpinner'

const StyledButton = styled.button`
  position: relative;
  font-size: ${themes.current().fontSizeSmall};
  color: ${themes.current().colorWhite};
  background: ${themes.current().colorGrayBlue};

  border: 0;
  border-radius: 5px;

  min-width: 70px;
  min-height: 26px;
  padding: 8px 12px 8px 12px;

  :hover {
    cursor: pointer;
  }
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
  variant?: 'primary' | 'secondary' | 'outlined'
  loading?: boolean
  onClick?: () => void
  type?: 'submit' | 'reset' | 'button'
}

export const Button = ({ loading, label, variant = 'primary', onClick, type }: Props) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {loading && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}
      {label}
    </StyledButton>
  )
}
