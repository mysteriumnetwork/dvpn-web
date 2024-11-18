/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState } from 'react'
import errors from '../../../commons/errors'
import { useAppSelector } from '../../../commons/hooks'
import complexActions from '../../../redux/complex.actions'
import { selectors } from '../../../redux/selectors'
import Card from '../../../components/Cards/Card'
import Button from '../../../components/Buttons/Button'
import { Form } from '../../../components/Inputs/Form'
import { LabeledInput } from '../../../components/Inputs/LabeledInput'

export default function PortForwardingCard() {
  const config = useAppSelector(selectors.currentConfig)
  const [loading, setLoading] = useState<boolean>(false)
  const [value, setValue] = useState<string>(config.data.udp.ports)
  async function handleConfigSave() {
    setLoading(true)
    try {
      await complexActions.setUserConfig({ udp: { ports: value } })
    } catch (err) {
      errors.parseToastError(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Card fluid>
      <Form className="flex flex-col w-full max-w-[500px] min-w-[240px] gap-4" onSubmit={handleConfigSave}>
        <div className="flex w-full flex-col">
          <LabeledInput fluid label="UDP Port range" value={value} onChange={setValue} errorMessagePadding={false} />
        </div>
        <div className="w-full sm:w-52">
          <Button fluid disabled={loading} type="submit" label="Save" />
        </div>
      </Form>
    </Card>
  )
}
