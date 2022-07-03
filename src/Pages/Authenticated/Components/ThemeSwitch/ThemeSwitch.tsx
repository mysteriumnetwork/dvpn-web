/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ReactComponent as LightIcon } from '../../../../assets/images/light.svg'
import styled from 'styled-components'
import themes from '../../../../commons/themes'

const LightOn = styled(LightIcon)`
  g circle,
  g path {
    stroke: ${themes.current().colorWhite};
  }
`

export const ThemeSwitch = () => {
  return (
    <>
      <LightOn />
    </>
  )
}
