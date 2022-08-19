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
import { AdvancedSettingsForms } from './AdvancedSettings'
import { InputGroup } from '../../../../../Components/Inputs/InputGroup'
import { NAT } from './NAT'

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const MarginTop = styled.div`
  margin-top: 20px;
`

interface Props {
  loading?: boolean
  form: AdvancedSettingsForms
  onChange: (traversals: string) => void
  handleSave: () => void
  handleReset: () => void
}

export const NATTraversalOrder = ({ handleSave, loading, onChange, form, handleReset }: Props) => {
  const handleChange = (items: DNDListItem[]) => {
    onChange(items.map((i) => i.id).join(','))
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
            {!loading && form.traversals && (
              <DNDList items={form.traversals.split(',').map((v) => ({ id: v, label: v }))} onChange={handleChange} />
            )}
          </>
        }
      />
    </SettingsCard>
  )
}
