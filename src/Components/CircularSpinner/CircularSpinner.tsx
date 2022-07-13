/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { themeCommon } from '../../theme/themeCommon'

export const CircularSpinner = styled.div`
  -webkit-animation: rotation 1s infinite linear;
  -moz-animation: rotation 1s infinite linear;
  -o-animation: rotation 1s infinite linear;
  animation: rotation 1s infinite linear;
  border: 6px solid rgba(0, 0, 0, .2);
  border-radius: 100%;

  :before {
    content: "";
    display: block;
    position: absolute;
    left: -6px;
    top: -6px;
    height: 100%;
    width: 100%;
    border-top: 6px solid ${themeCommon.colorKey};
    border-left: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid transparent;
    border-radius: 100%;
  }

  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(359deg);
    }
  }

  @-moz-keyframes rotation {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(359deg);
    }
  }

  @-o-keyframes rotation {
    from {
      -o-transform: rotate(0deg);
    }
    to {
      -o-transform: rotate(359deg);
    }
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

}
`
