/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import themes from '../../commons/themes'

const errorCSS = css`
  background: ${({ theme }) => theme.textInput.backgroundError} !important;
  color: ${({ theme }) => theme.textInput.textColorError} !important;
  border: ${({ theme }) => theme.textInput.borderError} !important;
`

const StyledInput = styled.input<StyledInputProps>`
  height: 35px;
  border-radius: 5px;
  width: 100%;

  font-weight: 400;
  font-size: ${themes.common.fontSizeNormal};
  line-height: 16px;
  padding-left: 5px;

  color: ${({ theme }) => theme.textInput.textColor};
  background: ${({ theme }) => theme.textInput.background};
  border: ${({ theme }) => theme.textInput.border};

  :focus {
    outline: 1px solid ${themes.common.colorGrayBlue2};
  }

  :disabled {
    color: ${({ theme }) => theme.textInput.textColorDisabled};
    background: ${({ theme }) => theme.textInput.backgroundDisabled};
    border: ${({ theme }) => theme.textInput.borderDisabled};
  }

  ${({ $error }) => $error && errorCSS};
  padding-right: ${({ $icon }) => ($icon ? '35px' : '0')};
`

interface StyledInputProps {
  $icon?: boolean
  $error?: boolean
}

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

export type TextFieldVariant = ''

interface Props {
  icon?: ReactNode
  value: string
  placeholder?: string
  onChange?: (v: string) => void
  disabled?: boolean
  type?: 'text' | 'password'
  error?: boolean
  textarea?: boolean
  variant?: TextFieldVariant
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
