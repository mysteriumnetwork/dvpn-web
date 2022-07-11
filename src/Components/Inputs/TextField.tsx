/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import themes from '../../commons/themes'
import { HTMLInputTypeAttribute, ReactNode } from 'react'

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

  color: ${({ $error }) => ($error ? `${themes.current().colorKey}` : themes.current().colorGrayBlue2)};
  background: ${({ $error }) => ($error ? `${themes.current().colorKey}1A` : themes.current().colorWhite)};
  border: 1px solid ${({ $error }) => ($error ? themes.current().colorKey : themes.current().colorGrayBlue)};

  border-radius: 5px;

  padding-right: ${({ $icon }) => ($icon ? '35px' : '0')};

  :focus {
    outline: 1px solid ${themes.current().colorGrayBlue2};
  }

  :disabled {
    background: ${themes.current().colorGrayBlue}1A;
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
  onChange?: (v: string) => void
  disabled?: boolean
  type?: HTMLInputTypeAttribute
  error?: boolean
}

export const TextField = ({ icon, value, onChange = () => {}, disabled, type = 'text', error }: Props) => {
  return (
    <Container>
      <StyledInput
        type={type}
        $icon={icon !== undefined}
        $error={error}
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
