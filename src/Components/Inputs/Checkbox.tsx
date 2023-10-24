/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { css } from 'styled-components'

const CSS = css`
  /* The container */
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 25px;
    height: 25px;
  }

  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: ${({ theme }) => theme.common.colorWhite};
    border: 1px solid ${({ theme }) => theme.common.colorKey};
    border-radius: 3px;
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: ${({ theme }) => theme.common.colorWhite};
  }

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: ${({ theme }) => theme.common.colorKey};
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

const CSSLabel = styled.div`
  ${CSS}
`

interface Props {
  checked: boolean
  onChange?: (b: boolean) => void
  disabled?: boolean
}

export const Checkbox = ({ onChange, disabled, checked }: Props) => {
  return (
    <CSSLabel>
      <label className="container">
        <input
          className="checkbox"
          disabled={disabled}
          checked={checked}
          type="checkbox"
          onChange={(e) => {
            const { checked } = e.target
            onChange && onChange(checked)
          }}
        />
        <span className="checkmark" />
      </label>
    </CSSLabel>
  )
}
