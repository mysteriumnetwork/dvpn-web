/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SettingsCard } from '../../SettingsCard'
import styled from 'styled-components'
import { Switch } from '../../../../../Components/Switch/Switch'
import themes from '../../../../../commons/themes'

const Row = styled.div`
  display: flex;
  gap: 40px;
`

const Title = styled.div`
  font-weight: 700;
  font-size: ${themes.current().fontSizeNormal};
  color: ${themes.current().colorDarkBlue};
`

interface StatusProps {}

const Status = styled.div<StatusProps>``
const On = styled.div``
const Wtf = styled.div``
const FlexGrow = styled.div`
  flex-grow: 1;
`

export const NodeStatus = () => {
  return (
    <SettingsCard>
      <Row>
        <Title>Node Status</Title>
        <Status>Node is running</Status>
        <FlexGrow />
        On
        <Switch checked={true} onChange={() => {}} />
      </Row>
    </SettingsCard>
  )
}
