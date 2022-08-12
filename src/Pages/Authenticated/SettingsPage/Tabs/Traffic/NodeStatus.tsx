/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SettingsCard } from '../../SettingsCard'
import styled from 'styled-components'
import { Switch } from '../../../../../Components/Switch/Switch'
import { themeCommon } from '../../../../../theme/themeCommon'
import { useAppSelector } from '../../../../../commons/hooks'
import { selectors } from '../../../../../redux/selectors'
import { tequila } from '../../../../../api/tequila'
import { useState } from 'react'
import { ConfirmationDialog } from '../../../../../Components/ConfirmationDialog/ConfirmationDialog'
import errors from '../../../../../commons/errors'

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`

const Title = styled.div`
  font-weight: 700;
  font-size: ${themeCommon.fontSizeNormal};
  color: ${themeCommon.colorDarkBlue};
`

const FlexGrow = styled.div`
  flex-grow: 1;
`

const COOL_DOWN_MS = 2000

export const NodeStatus = () => {
  const services = useAppSelector(selectors.runningServices)
  const { id } = useAppSelector(selectors.currentIdentity)

  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const on = services.length > 0

  const handle = async () => {
    setLoading(true)
    setShowConfirmation(false)
    try {
      if (on) {
        await tequila.stopAllServices()
      } else {
        await tequila.startAllServices(id)
      }
    } catch (err: any) {
      errors.parseToastError(err)
    }
    setTimeout(() => setLoading(false), COOL_DOWN_MS)
  }

  return (
    <SettingsCard loading={loading}>
      <Row>
        <Title>Node Status</Title>
        <FlexGrow />
        On
        <Switch checked={on} onChange={() => setShowConfirmation(true)} />
      </Row>
      <ConfirmationDialog
        title={on ? 'Stop Services' : 'Start Services'}
        message={on ? 'This will stop all running services!' : 'This will start all stopped services!'}
        show={showConfirmation}
        onConfirm={() => handle()}
        onCancel={() => setShowConfirmation(false)}
      />
    </SettingsCard>
  )
}
