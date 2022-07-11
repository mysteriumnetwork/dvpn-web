/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { QualityBarsIcon } from '../../../../Components/Icons/Icons'
import styled from 'styled-components'
import themes from '../../../../commons/themes'
import { Tooltip } from '../../../../Components/Tooltip/Tooltip'

const Content = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`

const Title = styled.div`
  color: ${({ theme }) => theme.colorTextMain};
  font-size: ${themes.common.fontSizeSmall};
`

export const Quality = () => {
  return (
    <Content>
      <Title>Quality</Title>
      <QualityBarsIcon $quality={2} />
      <Tooltip content="Blah Blah" position="bottom" />
    </Content>
  )
}
