/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactComponent as ICO01 } from '../../../../assets/images/info.svg'
import { ReactComponent as ICO05 } from '../../../../assets/images/onboarding/strip.svg'
import { ReactComponent as ICO06 } from '../../../../assets/images/onboarding/password.svg'
import { ReactComponent as ICO07 } from '../../../../assets/images/onboarding/wallet.svg'
import { ReactComponent as ICO08 } from '../../../../assets/images/onboarding/login.svg'
import { ReactComponent as ICO09 } from '../../../../assets/images/onboarding/direct.svg'
import { ReactComponent as ICO10 } from '../../../../assets/images/onboarding/paypal.svg'
import { ReactComponent as ICO11 } from '../../../../assets/images/onboarding/payment.svg'
import { ReactComponent as ICO23 } from '../../../../assets/images/info-big.svg'
import { ReactComponent as ICO32 } from '../../../../assets/images/triangle-down.svg'
import { ReactComponent as ICO35 } from '../../../../assets/images/check.svg'
import { ReactComponent as ICO47 } from '../../../../assets/images/bell.svg'
import { ReactComponent as ICO52 } from '../../../../assets/images/edit.svg'
import { ReactComponent as ICO57 } from '../../../../assets/images/copy-to-clipboard.svg'

import { CenteredColumn } from '../Components'
import React, { useMemo } from 'react'
import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 10px;
`

const ICON_SIZE = '60px'
const ICON_STYLE = { width: ICON_SIZE, height: ICON_SIZE }

const IconsBook = () => {
  const icons = useMemo(
    () => [
      <ICO01 style={ICON_STYLE} />,
      <ICO05 style={ICON_STYLE} />,
      <ICO06 style={ICON_STYLE} />,
      <ICO07 style={ICON_STYLE} />,
      <ICO08 style={ICON_STYLE} />,
      <ICO09 style={ICON_STYLE} />,
      <ICO10 style={ICON_STYLE} />,
      <ICO11 style={ICON_STYLE} />,
      <ICO23 style={ICON_STYLE} />,
      <ICO32 style={ICON_STYLE} />,
      <ICO35 style={ICON_STYLE} />,
      <ICO47 style={ICON_STYLE} />,
      <ICO52 style={ICON_STYLE} />,
      <ICO57 style={ICON_STYLE} />,
    ],
    [],
  )

  return (
    <CenteredColumn>
      <Row>
        {icons.map((i, index) => (
          <div key={`ico-sb-${index}`}>{i}</div>
        ))}
      </Row>
    </CenteredColumn>
  )
}

export default IconsBook
