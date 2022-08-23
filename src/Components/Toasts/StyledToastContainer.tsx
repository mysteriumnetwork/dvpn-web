/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast-container--bottom-right {
  }
  .Toastify__toast-container {
    padding: 0;
  }
  .Toastify__toast {
    padding: 0;
    border-radius: 0;
    min-height: 50px;
  }
  .Toastify__toast-body {
    padding: 0;
    margin: 0;
  }
  .Toastify__close-button {
    svg {
      fill: ${({ theme }) => theme.toasts.closeButtonColor};
      stroke: ${({ theme }) => theme.toasts.closeButtonColor};
      stroke-width: 0.1px;
      width: 10px;
      height: 10px;
    }
  }
`
