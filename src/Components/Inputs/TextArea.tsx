/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled, { css } from 'styled-components'
import { TextFieldVariant } from './TextField'
import { themeCommon } from '../../theme/themeCommon'

const errorCSS = css`
  background: ${({ theme }) => theme.textInput.bgError} !important;
  color: ${({ theme }) => theme.textInput.textColorError} !important;
  border: ${({ theme }) => theme.textInput.borderError} !important;
`

interface StyledTextAreaProps {
  $icon?: boolean
  $error?: boolean
}

const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  resize: none;
  border-radius: 5px;
  width: 100%;

  font-weight: 400;
  font-size: ${themeCommon.fontSizeNormal};
  line-height: 16px;
  padding: 5px;

  color: ${({ theme }) => theme.textInput.textColor};
  background: ${({ theme }) => theme.textInput.bg};
  border: ${({ theme }) => theme.textInput.border};

  :focus {
    outline: 1px solid ${themeCommon.colorGrayBlue2};
  }

  :disabled {
    color: ${({ theme }) => theme.textInput.textColorDisabled};
    background: ${({ theme }) => theme.textInput.bgDisabled};
    border: ${({ theme }) => theme.textInput.borderDisabled};
  }

  ${({ $error }) => $error && errorCSS};
  padding-right: ${({ $icon }) => ($icon ? '35px' : '0')};
`

interface Props {
  value: string
  placeholder?: string
  onChange?: (v: string) => void
  disabled?: boolean
  error?: boolean
  textarea?: boolean
  variant?: TextFieldVariant
  rows?: number
  cols?: number
}

export const TextArea = ({ value, error, placeholder, rows, cols, onChange }: Props) => {
  return (
    <StyledTextArea
      value={value}
      $error={error}
      placeholder={placeholder}
      onChange={(e) => {
        const { value } = e.target
        onChange && onChange(value)
      }}
      rows={rows}
      cols={cols}
    />
  )
}
