/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { createGlobalStyle } from 'styled-components'
import { ToastContainer } from 'react-toastify'

export const OffsetToastsGlobalCSS = createGlobalStyle`
  .Toastify__toast-container {
    bottom: 4em;
  }
`

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    padding: 0;
    min-height: 0;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.toasts.bg};
  }
  .Toastify__toast-body {
    padding: 0;
    margin: 0;
  }
  .Toastify__close-button {
    svg {
      fill: ${({ theme }) => theme.toasts.closeButtonColor};
      stroke: ${({ theme }) => theme.toasts.closeButtonColor};
      stroke-width: 0.5px;
      fill-opacity: 1;
      width: 10px;
      height: 10px;
    }
  }
`
