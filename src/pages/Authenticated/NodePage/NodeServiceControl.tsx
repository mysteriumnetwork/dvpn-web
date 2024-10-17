/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactNode, useState } from 'react'
import Label from '../../../components/Typography/Label'
import Text from '../../../components/Typography/Text'
import Toggle from '../../../components/Toggle/Toggle'
import Spinner from '../../../components/Spinner/Spinner'
import { selectors } from '../../../redux/selectors'
import calls from '../../../commons/calls'
import { useAppSelector } from '../../../commons/hooks'
import { tequila } from '../../../api/tequila'

type Props = {
  readonly name: string
  readonly description: string | ReactNode
  readonly serviceType: string
}

const NodeServiceControl = ({ name, description, serviceType }: Props) => {
  const { id } = useAppSelector(selectors.currentIdentity)
  const serviceInfo = useAppSelector(selectors.runningServices).find((si) => si.type === serviceType)
  const enabled = !!serviceInfo

  const [loading, setLoading] = useState<boolean>(false)

  const handleSwitch = async () => {
    setLoading(true)
    const sid = serviceInfo?.id
    if (sid) {
      await calls.tryTo(() => tequila.api.serviceStop(sid))
    } else {
      await calls.tryTo(() =>
        tequila.api.serviceStart({
          providerId: id,
          type: serviceType,
        }),
      )
    }
    setTimeout(() => setLoading(false), 1_000)
  }

  return (
    <>
      <div className="flex flex-col">
        <Label value={name} className="mb-2" />
        <Text className="text-gray-550" value={description} />
      </div>
      <div className="relative inline-flex items-center ml-2">
        <Toggle checked={enabled} onChange={handleSwitch} />
        {loading && (
          <div className="absolute z-[10000] top-0 left-0 right-0 bottom-0 w-full h-full flex justify-end items-center pr-[5px]">
            <Spinner size="lg" />
          </div>
        )}
      </div>
    </>
  )
}

export default NodeServiceControl
