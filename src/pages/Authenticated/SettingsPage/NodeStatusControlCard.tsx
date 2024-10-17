/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react'
import Card from '../../../components/Cards/Card'
import Label from '../../../components/Typography/Label'
import Toggle from '../../../components/Toggle/Toggle'
import ConfirmationModal from '../../../components/Modals/ConfirmationModal'
import { selectors } from '../../../redux/selectors'
import errors from '../../../commons/errors'
import { useAppSelector } from '../../../commons/hooks'
import { tequila } from '../../../api/tequila'

const COOL_DOWN_MS = 2000

export const NodeStatusControlCard = () => {
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
    <Card fluid isLoading={loading} className="flex flex-row justify-between mb-10">
      <Label value="Service State" />
      <Toggle checked={on} onChange={() => setShowConfirmation(true)} />
      <ConfirmationModal
        title={on ? 'Stop Services' : 'Start Services'}
        message={on ? 'This will stop all running services!' : 'This will start all stopped services!'}
        isOpen={showConfirmation}
        confirmLabel={on ? 'Stop' : 'Start'}
        onConfirm={handle}
        onCancel={() => setShowConfirmation(false)}
      />
    </Card>
  )
}
