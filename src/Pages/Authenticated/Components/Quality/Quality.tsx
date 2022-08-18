/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { QualityBarsIcon } from '../../../../Components/Icons/Icons'
import styled from 'styled-components'
import { themeCommon } from '../../../../theme/themeCommon'
import { Tooltip } from '../../../../Components/Tooltip/Tooltip'

const Content = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`

const Title = styled.div`
  color: ${({ theme }) => theme.text.colorMain};
  font-size: ${themeCommon.fontSizeSmall};
`

export const Quality = () => {
  return (
    <Content>
      <Title>Quality</Title>
      <QualityBarsIcon $quality={2} />
      <Tooltip content={'Indicates averaged quality as seen by consumers in your continent'} />
    </Content>
  )
}
