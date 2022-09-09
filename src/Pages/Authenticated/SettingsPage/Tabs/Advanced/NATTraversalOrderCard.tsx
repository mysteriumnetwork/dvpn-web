/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SettingsCard } from '../../SettingsCard'
import { Button } from '../../../../../Components/Inputs/Button'
import { DNDList, DNDListItem } from '../../../../../Components/Inputs/DNDList'
import styled from 'styled-components'
import { InputGroup } from '../../../../../Components/Inputs/InputGroup'
import { NAT } from './NAT'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../../commons/hooks'
import { selectors } from '../../../../../redux/selectors'
import { configs } from '../../../../../commons/config'
import calls from '../../../../../commons/calls'
import complexActions from '../../../../../redux/complex.actions'

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const MarginTop = styled.div`
  margin-top: 20px;
`

export const NATTraversalOrderCard = () => {
  const config = useAppSelector(selectors.currentConfig)
  const defaultConfig = useAppSelector(selectors.defaultConfig)

  const [loading, setLoading] = useState(true)
  const [traversal, setTraversal] = useState('')

  useEffect(() => {
    setTraversal(configs.natTraversals(config))
    setLoading(false)
  }, [])

  const handleChange = (items: DNDListItem[]) => {
    setTraversal(items.map((i) => i.id).join(','))
  }

  const handleSave = async () => {
    setLoading(true)
    await calls.tryTo(() => complexActions.setUserConfig({ traversal }), { success: 'NAT traversals saved' })
    setLoading(false)
  }

  const handleReset = async () => {
    setLoading(true)
    await calls.tryTo(
      () =>
        complexActions.setUserConfig({
          traversal: configs.natTraversals(defaultConfig),
        }),
      { success: 'NAT traversals reset' },
    )
    setTraversal(configs.natTraversals(defaultConfig))
    setLoading(false)
  }

  return (
    <SettingsCard
      loading={loading}
      title="NAT Traversal order"
      footer={
        <Controls>
          <Button variant="outlined" label="Restore default" onClick={handleReset} />
          <Button variant="secondary" label="Save" onClick={handleSave} />
        </Controls>
      }
    >
      <NAT />
      <InputGroup
        title="Drag items to reorder"
        input={
          <>
            <MarginTop />
            {!loading && traversal && (
              <DNDList items={traversal.split(',').map((v) => ({ id: v, label: v }))} onChange={handleChange} />
            )}
          </>
        }
      />
    </SettingsCard>
  )
}
