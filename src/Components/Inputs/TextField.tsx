/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import themes from '../../commons/themes'
import { ReactNode } from 'react'

interface StyledInputProps {
  $icon?: boolean
  $error?: boolean
}

const StyledInput = styled.input<StyledInputProps>`
  box-sizing: border-box;
  width: 100%;
  height: 35px;

  font-weight: 400;
  font-size: ${themes.common.fontSizeNormal};
  line-height: 16px;
  padding-left: 5px;

  color: ${({ $error }) => ($error ? `${themes.common.colorKey}` : themes.common.colorGrayBlue2)};
  background: ${({ $error }) => ($error ? `${themes.common.colorKey}1A` : themes.common.colorWhite)};
  border: 1px solid ${({ $error }) => ($error ? themes.common.colorKey : themes.common.colorGrayBlue)};

  border-radius: 5px;

  padding-right: ${({ $icon }) => ($icon ? '35px' : '0')};

  :focus {
    outline: 1px solid ${themes.common.colorGrayBlue2};
  }

  :disabled {
    background: ${themes.common.colorGrayBlue}1A;
  }
`

const Container = styled.div`
  position: relative;
  display: flex;
  height: 35px;
`
const IconContainer = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 35px;
  height: 35px;
`

const IconSize = styled.div`
  width: 20px;
  height: 20px;
`

interface Props {
  icon?: ReactNode
  value: string
  placeholder?: string
  onChange?: (v: string) => void
  disabled?: boolean
  type?: 'text' | 'password'
  error?: boolean
}

export const TextField = ({ icon, value, onChange = () => {}, disabled, type = 'text', error, placeholder }: Props) => {
  return (
    <Container>
      <StyledInput
        type={type}
        $icon={icon !== undefined}
        $error={error}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          const value = e.target.value
          onChange(value)
        }}
        disabled={disabled}
      />
      {icon && (
        <IconContainer>
          <IconSize>{icon}</IconSize>
        </IconContainer>
      )}
    </Container>
  )
}
