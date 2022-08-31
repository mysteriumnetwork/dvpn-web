/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactComponent as ICO01 } from '../../../../assets/images/info.svg'
import { ReactComponent as ICO02 } from '../../../../assets/images/people.svg'
import { ReactComponent as ICO03 } from '../../../../assets/images/question.svg'
import { ReactComponent as ICO04 } from '../../../../assets/images/restart.svg'
import { ReactComponent as ICO05 } from '../../../../assets/images/onboarding/strip.svg'
import { ReactComponent as ICO06 } from '../../../../assets/images/onboarding/password.svg'
import { ReactComponent as ICO07 } from '../../../../assets/images/onboarding/wallet.svg'
import { ReactComponent as ICO08 } from '../../../../assets/images/onboarding/login.svg'
import { ReactComponent as ICO09 } from '../../../../assets/images/onboarding/direct.svg'
import { ReactComponent as ICO10 } from '../../../../assets/images/onboarding/paypal.svg'
import { ReactComponent as ICO11 } from '../../../../assets/images/onboarding/payment.svg'
import { ReactComponent as ICO12 } from '../../../../assets/images/navigation/dashboard.svg'
import { ReactComponent as ICO13 } from '../../../../assets/images/navigation/sun.svg'
import { ReactComponent as ICO14 } from '../../../../assets/images/navigation/chat.svg'
import { ReactComponent as ICO15 } from '../../../../assets/images/navigation/transactions.svg'
import { ReactComponent as ICO16 } from '../../../../assets/images/navigation/settings.svg'
import { ReactComponent as ICO17 } from '../../../../assets/images/navigation/logo.svg'
import { ReactComponent as ICO18 } from '../../../../assets/images/navigation/settle.svg'
import { ReactComponent as ICO19 } from '../../../../assets/images/navigation/history.svg'
import { ReactComponent as ICO20 } from '../../../../assets/images/navigation/bug.svg'
import { ReactComponent as ICO21 } from '../../../../assets/images/navigation/moon.svg'
import { ReactComponent as ICO22 } from '../../../../assets/images/clock.svg'
import { ReactComponent as ICO23 } from '../../../../assets/images/info-big.svg'
import { ReactComponent as ICO24 } from '../../../../assets/images/chat.svg'
import { ReactComponent as ICO25 } from '../../../../assets/images/transactions.svg'
import { ReactComponent as ICO26 } from '../../../../assets/images/notifications/neutral.svg'
import { ReactComponent as ICO27 } from '../../../../assets/images/notifications/negative.svg'
import { ReactComponent as ICO28 } from '../../../../assets/images/notifications/empty.svg'
import { ReactComponent as ICO29 } from '../../../../assets/images/notifications/positive.svg'
import { ReactComponent as ICO30 } from '../../../../assets/images/notifications/update.svg'
import { ReactComponent as ICO31 } from '../../../../assets/images/cloud.svg'
import { ReactComponent as ICO32 } from '../../../../assets/images/triangle-down.svg'
import { ReactComponent as ICO33 } from '../../../../assets/images/drag-indicator.svg'
import { ReactComponent as ICO34 } from '../../../../assets/images/indicator.svg'
import { ReactComponent as ICO35 } from '../../../../assets/images/check.svg'
import { ReactComponent as ICO36 } from '../../../../assets/images/avatars/rabbit.svg'
import { ReactComponent as ICO37 } from '../../../../assets/images/avatars/dog.svg'
import { ReactComponent as ICO38 } from '../../../../assets/images/avatars/fox.svg'
import { ReactComponent as ICO39 } from '../../../../assets/images/avatars/lion.svg'
import { ReactComponent as ICO40 } from '../../../../assets/images/avatars/cat.svg'
import { ReactComponent as ICO41 } from '../../../../assets/images/avatars/gorilla.svg'
import { ReactComponent as ICO42 } from '../../../../assets/images/avatars/koala.svg'
import { ReactComponent as ICO43 } from '../../../../assets/images/avatars/bobcat.svg'
import { ReactComponent as ICO44 } from '../../../../assets/images/wallet.svg'
import { ReactComponent as ICO45 } from '../../../../assets/images/stopwatch.svg'
import { ReactComponent as ICO46 } from '../../../../assets/images/stopwatch_simple.svg'
import { ReactComponent as ICO47 } from '../../../../assets/images/bell.svg'
import { ReactComponent as ICO48 } from '../../../../assets/images/file.svg'
import { ReactComponent as ICO49 } from '../../../../assets/images/sessions.svg'
import { ReactComponent as ICO50 } from '../../../../assets/images/arrow-left.svg'
import { ReactComponent as ICO51 } from '../../../../assets/images/quality-bars.svg'
import { ReactComponent as ICO52 } from '../../../../assets/images/edit.svg'
import { ReactComponent as ICO53 } from '../../../../assets/images/input/external.svg'
import { ReactComponent as ICO54 } from '../../../../assets/images/input/x.svg'
import { ReactComponent as ICO55 } from '../../../../assets/images/input/burger.svg'
import { ReactComponent as ICO56 } from '../../../../assets/images/input/email.svg'
import { ReactComponent as ICO57 } from '../../../../assets/images/input/copy-to-clipboard.svg'
import { ReactComponent as ICO58 } from '../../../../assets/images/input/lock.svg'
import { ReactComponent as ICO59 } from '../../../../assets/images/data.svg'

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
      <ICO02 style={ICON_STYLE} />,
      <ICO03 style={ICON_STYLE} />,
      <ICO04 style={ICON_STYLE} />,
      <ICO05 style={ICON_STYLE} />,
      <ICO06 style={ICON_STYLE} />,
      <ICO07 style={ICON_STYLE} />,
      <ICO08 style={ICON_STYLE} />,
      <ICO09 style={ICON_STYLE} />,
      <ICO10 style={ICON_STYLE} />,
      <ICO11 style={ICON_STYLE} />,
      <ICO12 style={ICON_STYLE} />,
      <ICO13 style={ICON_STYLE} />,
      <ICO14 style={ICON_STYLE} />,
      <ICO15 style={ICON_STYLE} />,
      <ICO16 style={ICON_STYLE} />,
      <ICO17 style={ICON_STYLE} />,
      <ICO18 style={ICON_STYLE} />,
      <ICO19 style={ICON_STYLE} />,
      <ICO20 style={ICON_STYLE} />,
      <ICO21 style={ICON_STYLE} />,
      <ICO22 style={ICON_STYLE} />,
      <ICO23 style={ICON_STYLE} />,
      <ICO24 style={ICON_STYLE} />,
      <ICO25 style={ICON_STYLE} />,
      <ICO26 style={ICON_STYLE} />,
      <ICO27 style={ICON_STYLE} />,
      <ICO28 style={ICON_STYLE} />,
      <ICO29 style={ICON_STYLE} />,
      <ICO30 style={ICON_STYLE} />,
      <ICO31 style={ICON_STYLE} />,
      <ICO32 style={ICON_STYLE} />,
      <ICO33 style={ICON_STYLE} />,
      <ICO34 style={ICON_STYLE} />,
      <ICO35 style={ICON_STYLE} />,
      <ICO36 style={ICON_STYLE} />,
      <ICO37 style={ICON_STYLE} />,
      <ICO38 style={ICON_STYLE} />,
      <ICO39 style={ICON_STYLE} />,
      <ICO40 style={ICON_STYLE} />,
      <ICO41 style={ICON_STYLE} />,
      <ICO42 style={ICON_STYLE} />,
      <ICO43 style={ICON_STYLE} />,
      <ICO44 style={ICON_STYLE} />,
      <ICO45 style={ICON_STYLE} />,
      <ICO46 style={ICON_STYLE} />,
      <ICO47 style={ICON_STYLE} />,
      <ICO48 style={ICON_STYLE} />,
      <ICO49 style={ICON_STYLE} />,
      <ICO50 style={ICON_STYLE} />,
      <ICO51 style={ICON_STYLE} />,
      <ICO52 style={ICON_STYLE} />,
      <ICO53 style={ICON_STYLE} />,
      <ICO54 style={ICON_STYLE} />,
      <ICO55 style={ICON_STYLE} />,
      <ICO56 style={ICON_STYLE} />,
      <ICO57 style={ICON_STYLE} />,
      <ICO58 style={ICON_STYLE} />,
      <ICO59 style={ICON_STYLE} />,
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
